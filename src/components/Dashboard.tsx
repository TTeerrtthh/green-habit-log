import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { TreeGrowthDisplay } from './TreeGrowthDisplay';
import { useRewards } from '@/hooks/useRewards';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, Calendar, Target, Zap, Download, TreePine, Footprints, Car } from 'lucide-react';

interface HabitLog {
  id: string;
  habit_id: string;
  co2_saved: number;
  date: string;
  notes?: string;
}

interface HabitType {
  id: string;
  name: string;
  description: string;
  co2_saved: number;
  icon: string;
  category: string;
}

const COLORS = ['hsl(var(--success))', 'hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(var(--warning))', 'hsl(var(--destructive))'];

export const Dashboard = () => {
  const [habitLogs, setHabitLogs] = useState<HabitLog[]>([]);
  const [habitTypes, setHabitTypes] = useState<HabitType[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { rewards, getWeekProgress } = useRewards();

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const [logsResult, typesResult] = await Promise.all([
        supabase
          .from('habit_logs')
          .select('*')
          .eq('user_id', user.id)
          .order('date', { ascending: false }),
        supabase
          .from('habit_types')
          .select('*')
          .order('category, name')
      ]);

      if (logsResult.error) throw logsResult.error;
      if (typesResult.error) throw typesResult.error;

      setHabitLogs(logsResult.data || []);
      setHabitTypes(typesResult.data || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStats = () => {
    const totalCO2 = habitLogs.reduce((sum, log) => sum + log.co2_saved, 0);
    const totalDays = new Set(habitLogs.map(log => log.date)).size;
    
    // Calculate current streak
    let currentStreak = 0;
    const today = new Date().toISOString().split('T')[0];
    const sortedDates = Array.from(new Set(habitLogs.map(log => log.date))).sort().reverse();
    
    for (let i = 0; i < sortedDates.length; i++) {
      const date = sortedDates[i];
      const daysDiff = Math.floor((new Date(today).getTime() - new Date(date).getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === i) {
        currentStreak++;
      } else {
        break;
      }
    }

    const avgCO2PerWeek = totalDays > 0 ? (totalCO2 / totalDays) * 7 : 0;

    return {
      totalCO2: totalCO2.toFixed(1),
      currentStreak,
      totalDays,
      avgCO2PerWeek: avgCO2PerWeek.toFixed(1),
      treesEquivalent: Math.floor(totalCO2 / 22), // 1 tree absorbs ~22kg CO2/year
      carMilesAvoided: Math.floor(totalCO2 / 0.4) // ~0.4kg CO2 per mile
    };
  };

  const getCategoryData = () => {
    const categoryTotals = habitLogs.reduce((acc, log) => {
      const habitType = habitTypes.find(h => h.id === log.habit_id);
      if (habitType) {
        acc[habitType.category] = (acc[habitType.category] || 0) + log.co2_saved;
      }
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(categoryTotals).map(([category, co2]) => ({
      category: category.charAt(0).toUpperCase() + category.slice(1),
      co2: parseFloat(co2.toFixed(1))
    }));
  };

  const getWeeklyTrend = () => {
    const weeklyData = habitLogs.reduce((acc, log) => {
      const date = new Date(log.date);
      const week = `Week ${Math.ceil(date.getDate() / 7)}`;
      acc[week] = (acc[week] || 0) + log.co2_saved;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(weeklyData).map(([week, co2]) => ({
      week,
      co2: parseFloat(co2.toFixed(1))
    }));
  };

  const getHabitFrequency = () => {
    const frequency = habitLogs.reduce((acc, log) => {
      const habitType = habitTypes.find(h => h.id === log.habit_id);
      if (habitType) {
        acc[habitType.name] = (acc[habitType.name] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(frequency)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);
  };

  const exportData = () => {
    const csvData = [
      ['Date', 'Habit', 'Category', 'CO2 Saved (kg)', 'Notes'],
      ...habitLogs.map(log => {
        const habit = habitTypes.find(h => h.id === log.habit_id);
        return [
          log.date,
          habit?.name || 'Unknown',
          habit?.category || 'Unknown',
          log.co2_saved.toString(),
          log.notes || ''
        ];
      })
    ];

    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `ecotracker-data-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return <div className="text-center py-8">Loading dashboard...</div>;
  }

  const stats = getStats();
  const categoryData = getCategoryData();
  const weeklyTrend = getWeeklyTrend();
  const habitFrequency = getHabitFrequency();
  const progress = getWeekProgress();

  const statCards = [
    {
      title: 'Total CO₂ Saved',
      value: `${stats.totalCO2}kg`,
      icon: <Zap className="h-5 w-5" />,
      description: 'Your total environmental impact',
      color: 'text-success'
    },
    {
      title: 'Current Streak',
      value: `${stats.currentStreak} days`,
      icon: <TrendingUp className="h-5 w-5" />,
      description: 'Consecutive days of eco-actions',
      color: 'text-primary'
    },
    {
      title: 'Active Days',
      value: stats.totalDays,
      icon: <Calendar className="h-5 w-5" />,
      description: 'Days you\'ve logged habits',
      color: 'text-accent'
    },
    {
      title: 'Weekly Average',
      value: `${stats.avgCO2PerWeek}kg`,
      icon: <Target className="h-5 w-5" />,
      description: 'Average CO₂ saved per week',
      color: 'text-warning'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Track your environmental impact and progress</p>
        </div>
        <Button onClick={exportData} variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export Data
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index} className="shadow-eco-soft hover:shadow-eco-medium transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                </div>
                <div className={`${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Environmental Impact */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-eco-soft">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <TreePine className="h-6 w-6 text-success" />
              <div>
                <h3 className="font-bold text-lg">Trees Equivalent</h3>
                <p className="text-sm text-muted-foreground">CO₂ absorption equivalent</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-success">{stats.treesEquivalent}</div>
            <p className="text-sm text-muted-foreground">trees worth of CO₂ absorbed</p>
          </CardContent>
        </Card>

        <Card className="shadow-eco-soft">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Car className="h-6 w-6 text-primary" />
              <div>
                <h3 className="font-bold text-lg">Car Miles Avoided</h3>
                <p className="text-sm text-muted-foreground">Equivalent driving emissions</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-primary">{stats.carMilesAvoided}</div>
            <p className="text-sm text-muted-foreground">miles of driving emissions saved</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="charts" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="charts">Charts & Analytics</TabsTrigger>
          <TabsTrigger value="growth">Tree Growth Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="charts" className="space-y-6">
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Category Breakdown */}
            <Card className="shadow-eco-soft">
              <CardHeader>
                <CardTitle>CO₂ Savings by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="hsl(var(--primary))"
                      dataKey="co2"
                      label={({ category, co2 }) => `${category}: ${co2}kg`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: any) => [`${value}kg`, 'CO₂ Saved']} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Weekly Trend */}
            <Card className="shadow-eco-soft">
              <CardHeader>
                <CardTitle>Weekly CO₂ Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weeklyTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip formatter={(value: any) => [`${value}kg`, 'CO₂ Saved']} />
                    <Line 
                      type="monotone" 
                      dataKey="co2" 
                      stroke="hsl(var(--success))" 
                      strokeWidth={3}
                      dot={{ fill: 'hsl(var(--success))', strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Habit Frequency */}
          <Card className="shadow-eco-soft">
            <CardHeader>
              <CardTitle>Most Frequent Habits</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={habitFrequency}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value: any) => [value, 'Times Completed']} />
                  <Bar 
                    dataKey="count" 
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="growth" className="space-y-6">
          {/* Tree Growth Progress */}
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

              <div className="grid grid-cols-7 gap-3">
                {[1, 2, 3, 4, 5, 6, 7].map(day => {
                  const dayReward = rewards.find(r => r.day === day);
                  const isEarned = dayReward?.earned_at;
                  const isCurrentDay = day === (new Date().getDay() || 7);
                  
                  return (
                    <TreeGrowthDisplay
                      key={day}
                      day={day}
                      isEarned={!!isEarned}
                      isCurrentDay={isCurrentDay}
                    />
                  );
                })}
              </div>

              {progress.completed === 7 && (
                <div className="text-center p-6 bg-gradient-eco rounded-lg">
                  <div className="text-4xl mb-2">🏞️</div>
                  <h3 className="text-xl font-bold text-white">Week Complete!</h3>
                  <p className="text-white/90">You've grown a full forest this week!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};