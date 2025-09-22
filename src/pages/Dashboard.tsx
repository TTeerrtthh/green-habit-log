import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useHabits } from "@/hooks/useHabits";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StatsCards } from "@/components/StatsCards";
import { ProgressChart } from "@/components/ProgressChart";
import { DailyLogger } from "@/components/DailyLogger";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const { habitLogs, loading: habitsLoading, logHabit, exportData } = useHabits();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  if (authLoading || habitsLoading) {
    return (
      <div className="min-h-screen gradient-primary flex items-center justify-center">
        <div className="text-center text-white">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 pt-24 pb-16">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Your Carbon Impact Dashboard</h1>
            <p className="text-muted-foreground">Track your sustainable habits and monitor your environmental progress.</p>
          </div>

          <Tabs defaultValue="stats" className="space-y-6">
            <TabsList>
              <TabsTrigger value="stats">Statistics</TabsTrigger>
              <TabsTrigger value="logger">Log Habits</TabsTrigger>
            </TabsList>

            <TabsContent value="stats" className="space-y-6">
              <StatsCards habitLogs={habitLogs} />
              <ProgressChart habitLogs={habitLogs} />
              <div className="flex justify-end">
                <Button onClick={exportData} variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="logger">
              <DailyLogger 
                habitLogs={habitLogs}
                onLogHabit={logHabit}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </>
  );
}