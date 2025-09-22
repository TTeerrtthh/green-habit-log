import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { HabitType, HabitLog, HabitLogInsert } from '@/types';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

export function useHabits() {
  const [habitTypes, setHabitTypes] = useState<HabitType[]>([]);
  const [habitLogs, setHabitLogs] = useState<HabitLog[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  // Fetch habit types (public data)
  useEffect(() => {
    const fetchHabitTypes = async () => {
      const { data, error } = await supabase
        .from('habit_types')
        .select('*')
        .order('name');

      if (error) {
        console.error('Error fetching habit types:', error);
        toast({
          title: "Error",
          description: "Failed to load habit types",
          variant: "destructive",
        });
      } else {
        setHabitTypes(data || []);
      }
    };

    fetchHabitTypes();
  }, [toast]);

  // Fetch user's habit logs
  useEffect(() => {
    if (!user) {
      setHabitLogs([]);
      setLoading(false);
      return;
    }

    const fetchHabitLogs = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('habit_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (error) {
        console.error('Error fetching habit logs:', error);
        toast({
          title: "Error",
          description: "Failed to load your habit logs",
          variant: "destructive",
        });
      } else {
        setHabitLogs(data || []);
      }
      setLoading(false);
    };

    fetchHabitLogs();
  }, [user, toast]);

  // Log a habit
  const logHabit = async (habitId: string, date: string, notes?: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to log habits",
        variant: "destructive",
      });
      return;
    }

    // Find the habit type to get CO2 value
    const habitType = habitTypes.find(h => h.id === habitId);
    if (!habitType) {
      toast({
        title: "Error",
        description: "Habit type not found",
        variant: "destructive",
      });
      return;
    }

    // Check if already logged for this date
    const existingLog = habitLogs.find(
      log => log.habit_id === habitId && log.date === date
    );

    if (existingLog) {
      toast({
        title: "Already logged",
        description: "You have already logged this habit for today",
        variant: "destructive",
      });
      return;
    }

    const newLog: HabitLogInsert = {
      user_id: user.id,
      habit_id: habitId,
      date,
      co2_saved: habitType.co2_saved,
      notes: notes || null,
    };

    const { data, error } = await supabase
      .from('habit_logs')
      .insert([newLog])
      .select()
      .single();

    if (error) {
      console.error('Error logging habit:', error);
      toast({
        title: "Error",
        description: "Failed to log habit",
        variant: "destructive",
      });
    } else {
      // Add to local state
      setHabitLogs(prev => [data, ...prev]);
      toast({
        title: "Habit logged!",
        description: `Great job! You saved ${habitType.co2_saved}kg of CO₂`,
      });
    }
  };

  // Export data as CSV
  const exportData = () => {
    if (habitLogs.length === 0) {
      toast({
        title: "No data to export",
        description: "Start logging habits to export your data",
        variant: "destructive",
      });
      return;
    }

    const headers = ['Date', 'Habit', 'CO₂ Saved (kg)', 'Notes'];
    const csvContent = [
      headers.join(','),
      ...habitLogs.map(log => {
        const habitType = habitTypes.find(h => h.id === log.habit_id);
        return [
          log.date,
          habitType?.name || log.habit_id,
          log.co2_saved,
          log.notes || ''
        ].join(',');
      })
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'eco2-tracker-data.csv';
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Data exported",
      description: "Your habit data has been downloaded as CSV",
    });
  };

  return {
    habitTypes,
    habitLogs,
    loading,
    logHabit,
    exportData,
  };
}