import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { RewardDisplay } from './RewardDisplay';
import { useRewards } from '@/hooks/useRewards';
import { CheckCircle, Calendar, Leaf } from 'lucide-react';

interface HabitType {
  id: string;
  name: string;
  description: string;
  co2_saved: number;
  icon: string;
  category: string;
}

interface HabitLog {
  id: string;
  habit_id: string;
  co2_saved: number;
  date: string;
  notes?: string;
}

export const HabitTracker = () => {
  const [habitTypes, setHabitTypes] = useState<HabitType[]>([]);
  const [todayLogs, setTodayLogs] = useState<HabitLog[]>([]);
  const [selectedHabit, setSelectedHabit] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const { rewards, earnReward, getWeekProgress, canEarnReward } = useRewards();

  const today = new Date().toISOString().split('T')[0];
  const currentDayOfWeek = new Date().getDay() || 7; // Sunday = 7, Monday = 1, etc.

  useEffect(() => {
    fetchHabitTypes();
    fetchTodayLogs();
  }, [user]);

  const fetchHabitTypes = async () => {
    try {
      const { data, error } = await supabase
        .from('habit_types')
        .select('*')
        .order('category, name');

      if (error) throw error;
      setHabitTypes(data || []);
    } catch (error) {
      console.error('Error fetching habit types:', error);
    }
  };

  const fetchTodayLogs = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('habit_logs')
        .select('*')
        .eq('user_id', user.id)
        .eq('date', today);

      if (error) throw error;
      setTodayLogs(data || []);
    } catch (error) {
      console.error('Error fetching today logs:', error);
    }
  };

  const logHabit = async () => {
    if (!user || !selectedHabit) return;

    setLoading(true);
    try {
      const habitType = habitTypes.find(h => h.id === selectedHabit);
      if (!habitType) return;

      // Check if habit already logged today
      const existingLog = todayLogs.find(log => log.habit_id === selectedHabit);
      if (existingLog) {
        toast({
          title: "Already logged",
          description: "You've already logged this habit today!",
          variant: "destructive",
        });
        return;
      }

      const { data, error } = await supabase
        .from('habit_logs')
        .insert({
          user_id: user.id,
          habit_id: selectedHabit,
          co2_saved: habitType.co2_saved,
          date: today,
          notes: notes.trim() || null,
        })
        .select()
        .single();

      if (error) throw error;

      setTodayLogs(prev => [...prev, data]);
      setSelectedHabit(null);
      setNotes('');

      // Check if user can earn reward
      const newLogCount = todayLogs.length + 1;
      if (canEarnReward(currentDayOfWeek, newLogCount)) {
        await earnReward(currentDayOfWeek);
      }

      toast({
        title: "Habit logged! 🌱",
        description: `Great job! You saved ${habitType.co2_saved}kg of CO₂ today.`,
      });
    } catch (error) {
      console.error('Error logging habit:', error);
      toast({
        title: "Error",
        description: "Failed to log habit. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getTotalCO2Saved = () => {
    return todayLogs.reduce((total, log) => total + log.co2_saved, 0);
  };

  const progress = getWeekProgress();
  const completedHabitIds = todayLogs.map(log => log.habit_id);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Today's Eco Actions</h1>
        <p className="text-muted-foreground">
          Log your sustainable habits and watch your positive impact grow
        </p>
        
        <div className="flex items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">{new Date().toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-success" />
            <span className="text-sm font-medium">{getTotalCO2Saved().toFixed(1)}kg CO₂ saved today</span>
          </div>
        </div>
      </div>

      {/* Weekly Progress & Rewards */}
      <Card className="shadow-eco-medium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>Weekly Forest Progress</span>
            <Badge variant="secondary">{progress.completed}/7 days</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Week Progress</span>
              <span>{Math.round(progress.percentage)}%</span>
            </div>
            <Progress value={progress.percentage} className="h-3" />
          </div>

          <div className="grid grid-cols-7 gap-2">
            {[1, 2, 3, 4, 5, 6, 7].map(day => {
              const dayReward = rewards.find(r => r.day === day);
              const isEarned = dayReward?.earned_at;
              const isCurrentDay = day === currentDayOfWeek;
              
              return (
                <RewardDisplay
                  key={day}
                  day={day}
                  isEarned={!!isEarned}
                  isCurrentDay={isCurrentDay}
                  onClick={() => {
                    if (isCurrentDay && canEarnReward(day, todayLogs.length)) {
                      earnReward(day);
                    }
                  }}
                />
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Today's Habits */}
      <div className="grid gap-6">
        <Card className="shadow-eco-soft">
          <CardHeader>
            <CardTitle>Log Today's Habits</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Habit Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {habitTypes.map(habit => {
                const isCompleted = completedHabitIds.includes(habit.id);
                const isSelected = selectedHabit === habit.id;
                
                return (
                  <Card
                    key={habit.id}
                    className={`
                      flip-card h-32 cursor-pointer border-2 transition-all
                      ${isCompleted 
                        ? 'cursor-not-allowed' 
                        : isSelected 
                        ? 'border-primary shadow-eco-medium' 
                        : 'border-border hover:border-primary/50'
                      }
                    `}
                    onClick={() => !isCompleted && setSelectedHabit(isSelected ? null : habit.id)}
                  >
                    <div className="flip-card-inner">
                      {/* Front of card */}
                      <div className={`flip-card-front p-4 text-white flex flex-col justify-between ${isCompleted ? 'opacity-50' : ''}`}>
                        <div className="flex items-start justify-between">
                          <div className="text-2xl drop-shadow-lg">{habit.icon}</div>
                          {isCompleted && (
                            <CheckCircle className="h-5 w-5 text-white" />
                          )}
                        </div>
                        
                        <div className="space-y-1">
                          <h3 className="font-bold text-sm leading-tight">{habit.name}</h3>
                          <p className="text-xs opacity-90">{habit.description}</p>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-xs">
                            {habit.category}
                          </Badge>
                          <span className="text-xs font-bold text-white">
                            {habit.co2_saved}kg CO₂
                          </span>
                        </div>
                      </div>

                      {/* Back of card */}
                      <div className="flip-card-back p-4 text-white flex flex-col justify-center">
                        {isCompleted ? (
                          <div className="flex flex-col items-center justify-center space-y-2">
                            <CheckCircle className="w-8 h-8" />
                            <span className="text-sm font-bold">Completed!</span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center space-y-2">
                            <span className="text-lg font-bold">Click to Select</span>
                            <span className="text-xs opacity-90">Save {habit.co2_saved}kg CO₂</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Notes and Submit */}
            {selectedHabit && (
              <div className="space-y-4 p-4 bg-muted/50 rounded-lg border">
                <div>
                  <label className="text-sm font-medium">Notes (Optional)</label>
                  <Textarea
                    placeholder="Add any details about this eco-action..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    onClick={logHabit}
                    disabled={loading}
                    variant="vibrant"
                    className="text-white"
                  >
                    {loading ? "Logging..." : "Log Habit"}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSelectedHabit(null);
                      setNotes('');
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Today's Summary */}
        {todayLogs.length > 0 && (
          <Card className="shadow-eco-soft">
            <CardHeader>
              <CardTitle>Today's Impact Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todayLogs.map(log => {
                  const habitType = habitTypes.find(h => h.id === log.habit_id);
                  if (!habitType) return null;
                  
                  return (
                    <div key={log.id} className="flex items-center justify-between p-3 bg-success/5 rounded-lg border border-success/20">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{habitType.icon}</span>
                        <div>
                          <p className="font-medium text-sm">{habitType.name}</p>
                          {log.notes && (
                            <p className="text-xs text-muted-foreground">{log.notes}</p>
                          )}
                        </div>
                      </div>
                      <Badge className="bg-success text-success-foreground">
                        +{log.co2_saved}kg CO₂
                      </Badge>
                    </div>
                  );
                })}
                
                <div className="pt-3 border-t border-success/20">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Total CO₂ Saved Today:</span>
                    <span className="font-bold text-lg text-success">{getTotalCO2Saved().toFixed(1)}kg</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};