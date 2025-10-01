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
import { Checkbox } from '@/components/ui/checkbox';

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
  const [selectedHabits, setSelectedHabits] = useState<Set<string>>(new Set());
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
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

  const logHabits = async () => {
    if (!user || selectedHabits.size === 0) return;

    setLoading(true);
    try {
      const habitsToLog = Array.from(selectedHabits).filter(habitId => {
        const existingLog = todayLogs.find(log => log.habit_id === habitId);
        return !existingLog;
      });

      if (habitsToLog.length === 0) {
        toast({
          title: "Already logged",
          description: "All selected habits have already been logged today!",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      const logsToInsert = habitsToLog.map(habitId => {
        const habitType = habitTypes.find(h => h.id === habitId);
        return {
          user_id: user.id,
          habit_id: habitId,
          co2_saved: habitType?.co2_saved || 0,
          date: today,
          notes: notes.trim() || null,
        };
      });

      const { data, error } = await supabase
        .from('habit_logs')
        .insert(logsToInsert)
        .select();

      if (error) throw error;

      setTodayLogs(prev => [...prev, ...data]);
      setSelectedHabits(new Set());
      setNotes('');

      // Check if user can earn reward
      const newLogCount = todayLogs.length + data.length;
      if (canEarnReward(currentDayOfWeek, newLogCount)) {
        await earnReward(currentDayOfWeek);
      }

      const totalCO2 = data.reduce((sum, log) => sum + log.co2_saved, 0);
      toast({
        title: "Habits logged! 🌱",
        description: `Great job! You saved ${totalCO2.toFixed(1)}kg of CO₂ today.`,
      });
    } catch (error) {
      console.error('Error logging habits:', error);
      toast({
        title: "Error",
        description: "Failed to log habits. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleHabitSelection = (habitId: string) => {
    const newSelection = new Set(selectedHabits);
    if (newSelection.has(habitId)) {
      newSelection.delete(habitId);
    } else {
      newSelection.add(habitId);
    }
    setSelectedHabits(newSelection);
  };

  const getTotalCO2Saved = () => {
    return todayLogs.reduce((total, log) => total + log.co2_saved, 0);
  };

  const progress = getWeekProgress();
  const completedHabitIds = todayLogs.map(log => log.habit_id);
  
  const categories = [
    { id: 'all', label: 'All Categories', icon: '🌍' },
    { id: 'transport', label: 'Transport', icon: '🚌' },
    { id: 'energy', label: 'Energy', icon: '⚡' },
    { id: 'food', label: 'Food', icon: '🥗' },
    { id: 'consumption', label: 'Consumption', icon: '♻️' },
    { id: 'water', label: 'Water', icon: '🚿' },
    { id: 'waste', label: 'Waste', icon: '🗂️' },
  ];

  const filteredHabits = activeCategory === 'all' 
    ? habitTypes 
    : habitTypes.filter(h => h.category === activeCategory);

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
              {/* Category Filters */}
              <div className="flex flex-wrap gap-2 mb-4">
                {categories.map(cat => (
                  <Badge 
                    key={cat.id}
                    variant={activeCategory === cat.id ? "default" : "outline"}
                    className="cursor-pointer hover:bg-primary/10 transition-colors"
                    onClick={() => setActiveCategory(cat.id)}
                  >
                    {cat.icon} {cat.label}
                  </Badge>
                ))}
              </div>

              {/* Habit List with Checkboxes */}
              <div className="space-y-3">
                {filteredHabits.map(habit => {
                  const isCompleted = completedHabitIds.includes(habit.id);
                  const isSelected = selectedHabits.has(habit.id);
                  
                  return (
                    <Card
                      key={habit.id}
                      className={`
                        p-4 transition-all cursor-pointer
                        ${isCompleted 
                          ? 'opacity-50 cursor-not-allowed bg-muted' 
                          : isSelected 
                          ? 'border-2 border-primary shadow-eco-medium bg-primary/5' 
                          : 'border hover:border-primary/50 hover:shadow-eco-soft'
                        }
                      `}
                      onClick={() => !isCompleted && toggleHabitSelection(habit.id)}
                    >
                      <div className="flex items-start gap-4">
                        <Checkbox
                          checked={isCompleted || isSelected}
                          disabled={isCompleted}
                          onCheckedChange={() => !isCompleted && toggleHabitSelection(habit.id)}
                          className="mt-1"
                        />
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-2 flex-1">
                              <span className="text-2xl">{habit.icon}</span>
                              <div className="flex-1">
                                <h3 className="font-semibold text-sm leading-tight">{habit.name}</h3>
                                <p className="text-xs text-muted-foreground mt-0.5">{habit.description}</p>
                              </div>
                            </div>
                            
                            <div className="flex flex-col items-end gap-1">
                              <Badge variant="secondary" className="text-xs whitespace-nowrap">
                                {habit.category}
                              </Badge>
                              <span className="text-xs font-bold text-success whitespace-nowrap">
                                {habit.co2_saved}kg CO₂
                              </span>
                            </div>
                          </div>
                          
                          {isCompleted && (
                            <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                              <CheckCircle className="h-3 w-3" />
                              <span>Completed today</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>

            {/* Notes and Submit */}
            {selectedHabits.size > 0 && (
              <div className="space-y-4 p-4 bg-primary/5 rounded-lg border-2 border-primary/20 mt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    {selectedHabits.size} habit{selectedHabits.size > 1 ? 's' : ''} selected
                  </span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setSelectedHabits(new Set())}
                  >
                    Clear
                  </Button>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Notes (Optional)</label>
                  <Textarea
                    placeholder="Add any details about these eco-actions..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <Button 
                  onClick={logHabits}
                  disabled={loading}
                  variant="vibrant"
                  className="w-full text-white"
                >
                  {loading ? "Logging..." : `Log ${selectedHabits.size} Habit${selectedHabits.size > 1 ? 's' : ''}`}
                </Button>
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