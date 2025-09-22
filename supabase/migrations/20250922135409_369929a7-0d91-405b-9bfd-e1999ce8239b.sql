-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create habit_types table with predefined sustainable habits
CREATE TABLE public.habit_types (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  co2_saved DECIMAL(5,2) NOT NULL,
  icon TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'general'
);

-- Enable RLS on habit_types (public read access)
ALTER TABLE public.habit_types ENABLE ROW LEVEL SECURITY;

-- Create policy for habit_types (everyone can read)
CREATE POLICY "Anyone can view habit types" 
ON public.habit_types 
FOR SELECT 
USING (true);

-- Insert predefined habit types
INSERT INTO public.habit_types (id, name, description, co2_saved, icon, category) VALUES
('bike-commute', 'Bike to Work', 'Choose cycling over driving for your daily commute', 2.6, 'Bike', 'transport'),
('public-transport', 'Use Public Transport', 'Take the bus, train, or metro instead of driving', 2.3, 'Bus', 'transport'),
('plant-based-meal', 'Eat Plant-Based Meal', 'Choose a vegetarian or vegan meal over meat', 1.8, 'Leaf', 'food'),
('reusable-items', 'Use Reusable Items', 'Use reusable bags, bottles, or containers', 0.5, 'Recycle', 'lifestyle'),
('energy-conservation', 'Save Energy at Home', 'Turn off lights, unplug devices, or adjust thermostat', 1.2, 'Zap', 'energy');

-- Create habit_logs table for tracking daily entries
CREATE TABLE public.habit_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  habit_id TEXT NOT NULL REFERENCES public.habit_types(id),
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  co2_saved DECIMAL(5,2) NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, habit_id, date)
);

-- Enable RLS on habit_logs
ALTER TABLE public.habit_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for habit_logs
CREATE POLICY "Users can view their own habit logs" 
ON public.habit_logs 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own habit logs" 
ON public.habit_logs 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own habit logs" 
ON public.habit_logs 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own habit logs" 
ON public.habit_logs 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_habit_logs_updated_at
  BEFORE UPDATE ON public.habit_logs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.raw_user_meta_data->>'full_name', ''),
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger to automatically create profile when user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();