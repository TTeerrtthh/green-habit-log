import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HabitLog, HABIT_TYPES } from "@/types";

interface ProgressChartProps {
  habitLogs: HabitLog[];
}

export function ProgressChart({ habitLogs }: ProgressChartProps) {
  // Process data for cumulative CO₂ savings over time
  const processTimelineData = () => {
    const sortedLogs = [...habitLogs].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const timeline: { date: string; cumulative: number; daily: number }[] = [];
    let cumulative = 0;

    // Group logs by date
    const logsByDate = sortedLogs.reduce((acc, log) => {
      if (!acc[log.date]) acc[log.date] = [];
      acc[log.date].push(log);
      return acc;
    }, {} as Record<string, HabitLog[]>);

    // Create timeline data
    Object.entries(logsByDate).forEach(([date, logs]) => {
      const daily = logs.reduce((sum, log) => sum + log.co2_saved, 0);
      cumulative += daily;
      timeline.push({
        date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        cumulative: Math.round(cumulative * 10) / 10,
        daily: Math.round(daily * 10) / 10
      });
    });

    return timeline.slice(-14); // Last 14 days
  };

  // Process data for habit frequency
  const processHabitFrequency = () => {
    const frequency = HABIT_TYPES.map(habit => {
      const count = habitLogs.filter(log => log.habit_type === habit.id).length;
      return {
        name: habit.name.split(' ').slice(0, 2).join(' '), // Shortened names
        count,
        co2_saved: Math.round(count * habit.co2_saved * 10) / 10
      };
    });

    return frequency.sort((a, b) => b.count - a.count);
  };

  const timelineData = processTimelineData();
  const frequencyData = processHabitFrequency();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Cumulative CO₂ Savings Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center space-x-2">
            <span>📈</span>
            <span>CO₂ Savings Over Time</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="date" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}kg`}
              />
              <Tooltip 
                contentStyle={{ 
                  background: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
                formatter={(value, name) => [`${value}kg CO₂`, name === 'cumulative' ? 'Total Saved' : 'Daily Saved']}
              />
              <Line 
                type="monotone" 
                dataKey="cumulative" 
                stroke="hsl(var(--success))"
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--success))', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'hsl(var(--success))', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Habit Frequency Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center space-x-2">
            <span>📊</span>
            <span>Habit Frequency</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={frequencyData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                type="number"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                type="category"
                dataKey="name"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                width={100}
              />
              <Tooltip 
                contentStyle={{ 
                  background: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
                formatter={(value, name) => [
                  name === 'count' ? `${value} times` : `${value}kg CO₂`,
                  name === 'count' ? 'Logged' : 'Total Saved'
                ]}
              />
              <Bar 
                dataKey="count" 
                fill="hsl(var(--primary))"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}