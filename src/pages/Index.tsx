import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Leaf, BarChart3, Calendar, Download } from "lucide-react";
import { DailyLogger } from "@/components/DailyLogger";
import { StatsCards } from "@/components/StatsCards";
import { ProgressChart } from "@/components/ProgressChart";
import { HabitLog, HABIT_TYPES } from "@/types";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
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

  const handleExportData = () => {
    const csvContent = [
      ['Date', 'Habit', 'CO2 Saved (kg)', 'Notes'].join(','),
      ...habitLogs.map(log => {
        const habit = HABIT_TYPES.find(h => h.id === log.habit_type);
        return [
          log.date,
          `"${habit?.name || log.habit_type}"`,
          log.co2_saved,
          `"${log.notes || ''}"`
        ].join(',');
      })
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `carbon-footprint-data-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Data exported",
      description: "Your habit data has been exported as CSV.",
    });
  };

  const totalCO2Saved = habitLogs.reduce((sum, log) => sum + log.co2_saved, 0);

  return (
    <div className="min-h-screen gradient-subtle">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="gradient-primary p-3 rounded-xl">
                <Leaf className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Carbon Footprint Tracker</h1>
                <p className="text-muted-foreground">Track your daily sustainable habits and environmental impact</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-success/20 text-success px-4 py-2">
                {Math.round(totalCO2Saved * 10) / 10}kg CO₂ saved total
              </Badge>
              <Button 
                variant="outline" 
                onClick={handleExportData}
                className="hidden sm:flex"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="logger" className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Log Habits</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
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

        {/* Footer Note */}
        <Card className="mt-12 bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="font-semibold mb-2">Ready to add backend functionality?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                To enable user authentication, database storage, and real data persistence, 
                connect your project to Supabase using our native integration.
              </p>
              <Button variant="outline" className="border-primary/30 hover:bg-primary/10">
                Learn about Supabase Integration
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
