import { useState, useEffect } from 'react';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DailyLogger } from "@/components/DailyLogger";
import { StatsCards } from "@/components/StatsCards";
import { ProgressChart } from "@/components/ProgressChart";
import { HabitLog, HABIT_TYPES } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Calendar } from "lucide-react";

const Dashboard = () => {
  const [habitLogs, setHabitLogs] = useState<HabitLog[]>([]);
  const { toast } = useToast();

  // Initialize with some demo data to show functionality
  useEffect(() => {
    const generateDemoData = () => {
      const demoLogs: HabitLog[] = [];
      const today = new Date();
      
      // Generate data for the last 2 weeks
      for (let i = 0; i < 14; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        
        // Randomly add 1-3 habits per day with some missing days
        if (Math.random() > 0.2) { // 80% chance of logging something
          const numHabits = Math.floor(Math.random() * 3) + 1;
          const shuffledHabits = [...HABIT_TYPES].sort(() => Math.random() - 0.5);
          
          for (let j = 0; j < numHabits; j++) {
            const habit = shuffledHabits[j];
            demoLogs.push({
              id: `demo-${i}-${j}`,
              user_id: 'demo-user',
              habit_type: habit.id,
              co2_saved: habit.co2_saved,
              date: dateStr,
              notes: Math.random() > 0.7 ? `Demo note for ${habit.name}` : undefined,
              created_at: new Date(date.getTime() + j * 1000)
            });
          }
        }
      }
      
      return demoLogs.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    };

    const savedLogs = localStorage.getItem('carbonTracker_habitLogs');
    if (savedLogs) {
      setHabitLogs(JSON.parse(savedLogs));
    } else {
      const demoData = generateDemoData();
      setHabitLogs(demoData);
      localStorage.setItem('carbonTracker_habitLogs', JSON.stringify(demoData));
    }
  }, []);

  const handleLogHabit = (habitId: string, date: string, notes?: string) => {
    // Check if habit already logged for this date
    const existingLog = habitLogs.find(log => log.habit_type === habitId && log.date === date);
    if (existingLog) {
      toast({
        title: "Already logged",
        description: "You've already logged this habit for this date.",
        variant: "destructive"
      });
      return;
    }

    const habit = HABIT_TYPES.find(h => h.id === habitId);
    if (!habit) return;

    const newLog: HabitLog = {
      id: `${Date.now()}-${habitId}`,
      user_id: 'current-user',
      habit_type: habitId,
      co2_saved: habit.co2_saved,
      date,
      notes,
      created_at: new Date()
    };

    const updatedLogs = [newLog, ...habitLogs];
    setHabitLogs(updatedLogs);
    localStorage.setItem('carbonTracker_habitLogs', JSON.stringify(updatedLogs));

    toast({
      title: "Habit logged! 🌱",
      description: `Great job! You saved ${habit.co2_saved}kg of CO₂.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
          <main className="container mx-auto px-4 py-8">
            <Tabs defaultValue="stats" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
                <TabsTrigger value="stats" className="flex items-center space-x-2">
                  <BarChart3 className="w-4 h-4" />
                  <span>Statistics</span>
                </TabsTrigger>
                <TabsTrigger value="logger" className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Log Habits</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="stats" className="space-y-6">
                <StatsCards habitLogs={habitLogs} />
                <ProgressChart habitLogs={habitLogs} />
              </TabsContent>

              <TabsContent value="logger">
                <DailyLogger 
                  habitLogs={habitLogs} 
                  onLogHabit={handleLogHabit}
                />
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;