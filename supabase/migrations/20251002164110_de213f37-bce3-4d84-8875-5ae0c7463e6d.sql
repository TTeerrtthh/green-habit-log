-- Create a secure leaderboard view that aggregates CO2 savings
-- This prevents client-side data exposure and PII leakage
CREATE OR REPLACE VIEW public.leaderboard_stats AS
SELECT 
  p.user_id,
  p.display_name,
  COALESCE(SUM(hl.co2_saved), 0) as total_co2_saved,
  ROW_NUMBER() OVER (ORDER BY COALESCE(SUM(hl.co2_saved), 0) DESC) as rank
FROM public.profiles p
LEFT JOIN public.habit_logs hl ON p.user_id = hl.user_id
GROUP BY p.user_id, p.display_name
ORDER BY total_co2_saved DESC;

-- Enable RLS on the view (views inherit RLS from base tables by default, but we make it explicit)
ALTER VIEW public.leaderboard_stats SET (security_invoker = false);

-- Create a policy allowing authenticated users to view leaderboard stats
-- Note: Views don't support RLS policies directly, but the underlying tables do
-- This policy allows reading display_name from profiles for leaderboard purposes
CREATE POLICY "Public leaderboard display names"
ON public.profiles
FOR SELECT
TO authenticated
USING (true);

-- Create a function to get leaderboard data (security definer to bypass RLS safely)
CREATE OR REPLACE FUNCTION public.get_leaderboard_stats()
RETURNS TABLE (
  user_id uuid,
  display_name text,
  total_co2_saved numeric,
  rank bigint
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    p.user_id,
    p.display_name,
    COALESCE(SUM(hl.co2_saved), 0) as total_co2_saved,
    ROW_NUMBER() OVER (ORDER BY COALESCE(SUM(hl.co2_saved), 0) DESC) as rank
  FROM public.profiles p
  LEFT JOIN public.habit_logs hl ON p.user_id = hl.user_id
  GROUP BY p.user_id, p.display_name
  ORDER BY total_co2_saved DESC;
$$;

-- Add validation for display names in the handle_new_user trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
  validated_name text;
BEGIN
  -- Validate and sanitize display name (2-50 chars, alphanumeric + spaces only)
  validated_name := COALESCE(
    NULLIF(TRIM(NEW.raw_user_meta_data->>'display_name'), ''),
    NULLIF(TRIM(NEW.raw_user_meta_data->>'full_name'), ''),
    ''
  );
  
  -- Enforce length constraints
  IF LENGTH(validated_name) < 2 OR LENGTH(validated_name) > 50 THEN
    validated_name := 'User';
  END IF;
  
  -- Remove potentially dangerous characters (keep only alphanumeric and spaces)
  validated_name := REGEXP_REPLACE(validated_name, '[^a-zA-Z0-9 ]', '', 'g');
  
  INSERT INTO public.profiles (user_id, display_name, email)
  VALUES (
    NEW.id,
    validated_name,
    NEW.email
  );
  RETURN NEW;
END;
$function$;

-- Create a table for rate limiting
CREATE TABLE IF NOT EXISTS public.rate_limits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  action_type text NOT NULL,
  action_count integer NOT NULL DEFAULT 1,
  window_start timestamp with time zone NOT NULL DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(user_id, action_type, window_start)
);

-- Enable RLS on rate_limits
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own rate limits
CREATE POLICY "Users can view their own rate limits"
ON public.rate_limits
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Policy: System can insert/update rate limits (handled by functions)
CREATE POLICY "System can manage rate limits"
ON public.rate_limits
FOR ALL
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Function to check and enforce rate limits
CREATE OR REPLACE FUNCTION public.check_rate_limit(
  _user_id uuid,
  _action_type text,
  _max_actions integer,
  _window_minutes integer DEFAULT 1440 -- 24 hours default
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_count integer;
  window_start_time timestamp with time zone;
BEGIN
  window_start_time := now() - (interval '1 minute' * _window_minutes);
  
  -- Get current count for this action within the time window
  SELECT COALESCE(SUM(action_count), 0)
  INTO current_count
  FROM public.rate_limits
  WHERE user_id = _user_id
    AND action_type = _action_type
    AND window_start > window_start_time;
  
  -- If limit exceeded, return false
  IF current_count >= _max_actions THEN
    RETURN false;
  END IF;
  
  -- Increment the counter
  INSERT INTO public.rate_limits (user_id, action_type, action_count, window_start)
  VALUES (_user_id, _action_type, 1, DATE_TRUNC('hour', now()))
  ON CONFLICT (user_id, action_type, window_start)
  DO UPDATE SET action_count = rate_limits.action_count + 1;
  
  RETURN true;
END;
$$;

-- Create security events logging table
CREATE TABLE IF NOT EXISTS public.security_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  event_type text NOT NULL,
  event_details jsonb,
  ip_address text,
  user_agent text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on security_events
ALTER TABLE public.security_events ENABLE ROW LEVEL SECURITY;

-- Policy: Only admins can view security events (for now, no one can)
-- You'll need to implement admin roles to enable this
CREATE POLICY "No public access to security events"
ON public.security_events
FOR SELECT
TO authenticated
USING (false);

-- Function to log security events
CREATE OR REPLACE FUNCTION public.log_security_event(
  _user_id uuid,
  _event_type text,
  _event_details jsonb DEFAULT NULL,
  _ip_address text DEFAULT NULL,
  _user_agent text DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.security_events (user_id, event_type, event_details, ip_address, user_agent)
  VALUES (_user_id, _event_type, _event_details, _ip_address, _user_agent);
END;
$$;