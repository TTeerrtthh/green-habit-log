import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HabitSelector } from "@/components/HabitSelector";
import { DailyLogger } from "@/components/DailyLogger";
import { StatsCards } from "@/components/StatsCards";
import { ProgressChart } from "@/components/ProgressChart";
import { HabitLog, HABIT_TYPES } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Calendar } from "lucide-react";

const Index = () => {
  const [habitLogs, setHabitLogs] = useState<HabitLog[]>([]);
  const [selectedHabits, setSelectedHabits] = useState<string[]>([]);
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

  const handleHabitToggle = (habitId: string) => {
    setSelectedHabits(prev => 
      prev.includes(habitId)
        ? prev.filter(id => id !== habitId)
        : [...prev, habitId]
    );
  };

  // Home page component
  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <main className="container mx-auto px-4 py-12">
        <HabitSelector 
          selectedHabits={selectedHabits}
          onHabitToggle={handleHabitToggle}
        />
      </main>
    </div>
  );

  // Dashboard page component  
  const DashboardPage = () => (
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
  );

  // Placeholder pages
  const PlaceholderPage = ({ title }: { title: string }) => (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <main className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">{title}</h1>
          <p className="text-muted-foreground">Coming soon...</p>
        </div>
      </main>
    </div>
  );

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/track" element={<DashboardPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/insights" element={<PlaceholderPage title="Green Insights" />} />
            <Route path="/about" element={<PlaceholderPage title="About" />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default Index;
