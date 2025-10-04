-- Drop the security definer view (security concern from linter)
DROP VIEW IF EXISTS public.leaderboard_stats;

-- The security definer function get_leaderboard_stats() is the secure way to access leaderboard data
-- It was already created in the previous migration and is safe to use