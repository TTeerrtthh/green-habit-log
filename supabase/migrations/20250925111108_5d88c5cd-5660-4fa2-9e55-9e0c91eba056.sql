-- Create user_rewards table for the reward system
CREATE TABLE public.user_rewards (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  streak_week INTEGER NOT NULL,
  day INTEGER NOT NULL,
  reward_type TEXT NOT NULL,
  earned_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on user_rewards
ALTER TABLE public.user_rewards ENABLE ROW LEVEL SECURITY;

-- Create policies for user_rewards
CREATE POLICY "Users can view their own rewards" 
ON public.user_rewards 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own rewards" 
ON public.user_rewards 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own rewards" 
ON public.user_rewards 
FOR UPDATE 
USING (auth.uid() = user_id);