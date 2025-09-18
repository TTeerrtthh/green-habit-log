import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HabitLog } from "@/types";
import { TrendingUp, Calendar, Target, Zap } from "lucide-react";

interface StatsCardsProps {
  habitLogs: HabitLog[];
}

export function StatsCards({ habitLogs }: StatsCardsProps) {
  // Calculate statistics
  const calculateStats = () => {
    const totalCO2 = habitLogs.reduce((sum, log) => sum + log.co2_saved, 0);
    
    // Calculate streak (consecutive days with at least one logged habit)
    const uniqueDates = [...new Set(habitLogs.map(log => log.date))].sort();
    let streak = 0;
    const today = new Date().toISOString().split('T')[0];
    
    // Check for current streak going backwards from today
    for (let i = 0; i < uniqueDates.length; i++) {
      const checkDate = new Date();
      checkDate.setDate(checkDate.getDate() - i);
      const checkDateStr = checkDate.toISOString().split('T')[0];
      
      if (uniqueDates.includes(checkDateStr)) {
        streak++;
      } else {
        break;
      }
    }

    const totalDays = uniqueDates.length;
    
    // Calculate weeks since first log
    const firstLogDate = uniqueDates[0] ? new Date(uniqueDates[0]) : new Date();
    const weeksSinceStart = Math.max(1, Math.ceil((Date.now() - firstLogDate.getTime()) / (7 * 24 * 60 * 60 * 1000)));
    
    const weeklyAverage = totalCO2 / weeksSinceStart;
    const monthlyAverage = totalCO2 / Math.max(1, weeksSinceStart / 4);

    return {
      totalCO2: Math.round(totalCO2 * 10) / 10,
      streak,
      totalDays,
      weeklyAverage: Math.round(weeklyAverage * 10) / 10,
      monthlyAverage: Math.round(monthlyAverage * 10) / 10
    };
  };

  const stats = calculateStats();

  const statCards = [
    {
      title: "Total CO₂ Saved",
      value: `${stats.totalCO2}kg`,
      description: "Environmental impact",
      icon: TrendingUp,
      gradient: "gradient-success",
      textColor: "text-success-foreground"
    },
    {
      title: "Current Streak",
      value: `${stats.streak} days`,
      description: "Consecutive logging days",
      icon: Zap,
      gradient: "gradient-primary",
      textColor: "text-primary-foreground"
    },
    {
      title: "Total Active Days",
      value: `${stats.totalDays}`,
      description: "Days with logged habits",
      icon: Calendar,
      gradient: "gradient-nature",
      textColor: "text-white"
    },
    {
      title: "Weekly Average",
      value: `${stats.weeklyAverage}kg`,
      description: "CO₂ saved per week",
      icon: Target,
      gradient: "bg-gradient-to-br from-accent to-accent/80",
      textColor: "text-accent-foreground"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <Card key={stat.title} className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
                {stat.title}
                <IconComponent className="w-4 h-4" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`${stat.gradient} rounded-lg p-4 ${stat.textColor}`}>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <p className="text-sm opacity-90">{stat.description}</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}