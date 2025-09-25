import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

interface UserReward {
  id: string;
  day: number;
  streak_week: number;
  reward_type: string;
  earned_at: string | null;
}

export const useRewards = () => {
  const [rewards, setRewards] = useState<UserReward[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const getCurrentWeek = () => {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const daysSinceStartOfYear = Math.floor((now.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000));
    return Math.ceil((daysSinceStartOfYear + startOfYear.getDay() + 1) / 7);
  };

  const fetchRewards = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const currentWeek = getCurrentWeek();
      const { data, error } = await supabase
        .from('user_rewards')
        .select('*')
        .eq('user_id', user.id)
        .eq('streak_week', currentWeek)
        .order('day');

      if (error) throw error;
      setRewards(data || []);
    } catch (error) {
      console.error('Error fetching rewards:', error);
    } finally {
      setLoading(false);
    }
  };

  const earnReward = async (day: number) => {
    if (!user) return;
    
    try {
      const currentWeek = getCurrentWeek();
      const rewardType = `day_${day}`;
      
      // Check if reward already exists
      const existingReward = rewards.find(r => r.day === day);
      if (existingReward && existingReward.earned_at) {
        toast({
          title: "Reward already earned!",
          description: `You've already earned the Day ${day} reward this week.`,
        });
        return;
      }

      // Create or update the reward
      const { data, error } = await supabase
        .from('user_rewards')
        .upsert({
          user_id: user.id,
          streak_week: currentWeek,
          day,
          reward_type: rewardType,
          earned_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;

      // Update local state
      setRewards(prev => {
        const updated = prev.filter(r => r.day !== day);
        return [...updated, data].sort((a, b) => a.day - b.day);
      });

      // Show celebration toast
      const rewardMessages = {
        1: "Planted your sustainability seed! 🌱",
        2: "Your eco-efforts are sprouting! 🌿", 
        3: "Growing stronger every day! 🪴",
        4: "Your impact is taking root! 🌳",
        5: "Almost there - your forest is growing! 🌲",
        6: "One day from your weekly forest! 🌴",
        7: "Week completed! Your forest is thriving! 🏞️"
      };

      toast({
        title: "Reward Earned!",
        description: rewardMessages[day as keyof typeof rewardMessages] || "Great job!",
      });

    } catch (error) {
      console.error('Error earning reward:', error);
      toast({
        title: "Error",
        description: "Failed to earn reward. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getWeekProgress = () => {
    const earnedRewards = rewards.filter(r => r.earned_at).length;
    return {
      completed: earnedRewards,
      total: 7,
      percentage: (earnedRewards / 7) * 100
    };
  };

  const canEarnReward = (day: number, completedHabits: number) => {
    // User can earn reward if they've completed at least one habit today
    // and haven't already earned the reward for this day
    const existingReward = rewards.find(r => r.day === day);
    return completedHabits > 0 && (!existingReward || !existingReward.earned_at);
  };

  useEffect(() => {
    if (user) {
      fetchRewards();
    }
  }, [user]);

  return {
    rewards,
    loading,
    earnReward,
    getWeekProgress,
    canEarnReward,
    refetch: fetchRewards,
  };
};