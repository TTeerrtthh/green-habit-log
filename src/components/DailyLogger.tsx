import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Leaf } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { HabitCard } from "./HabitCard";
import { HabitLog, HabitType } from "@/types";
import { useHabits } from "@/hooks/useHabits";

interface DailyLoggerProps {
  habitLogs: HabitLog[];
  onLogHabit: (habitId: string, date: string, notes?: string) => void;
}

export function DailyLogger({ habitLogs, onLogHabit }: DailyLoggerProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { habitTypes } = useHabits();
  const selectedDateStr = format(selectedDate, 'yyyy-MM-dd');

  // Get habits already logged for selected date
  const loggedHabits = habitLogs
    .filter(log => log.date === selectedDateStr)
    .map(log => log.habit_id);

  const handleLogHabit = (habitId: string, notes?: string) => {
    onLogHabit(habitId, selectedDateStr, notes);
  };

  const isToday = format(new Date(), 'yyyy-MM-dd') === selectedDateStr;
  const totalCO2ForDate = habitLogs
    .filter(log => log.date === selectedDateStr)
    .reduce((sum, log) => sum + log.co2_saved, 0);

  return (
    <div className="space-y-6">
      {/* Date Selection Header */}
      <Card className="gradient-subtle border-0">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Leaf className="w-6 h-6 text-success" />
              <div>
                <h2 className="text-xl font-bold">Daily Habit Logger</h2>
                <p className="text-sm text-muted-foreground">Track your sustainable habits</p>
              </div>
            </div>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    "hover:bg-success/10 border-success/30"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(selectedDate, 'PPP')}
                  {isToday && <span className="ml-2 text-xs bg-success text-success-foreground px-2 py-0.5 rounded-full">Today</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </CardTitle>
        </CardHeader>
        
        {totalCO2ForDate > 0 && (
          <CardContent className="pt-0">
            <div className="flex items-center space-x-2">
              <div className="h-2 bg-success/20 rounded-full flex-1">
                <div 
                  className="h-full bg-success rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (totalCO2ForDate / 10) * 100)}%` }}
                />
              </div>
              <span className="text-sm font-medium text-success">
                {Math.round(totalCO2ForDate * 10) / 10}kg CO₂ saved
              </span>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Habit Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {habitTypes.map(habit => (
          <HabitCard
            key={habit.id}
            habit={habit}
            isLogged={loggedHabits.includes(habit.id)}
            onLog={handleLogHabit}
            disabled={!isToday && selectedDate > new Date()}
          />
        ))}
      </div>

      {/* Daily Summary */}
      {loggedHabits.length > 0 && (
        <Card className="bg-success/5 border-success/20">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="font-semibold text-success mb-2">
                Great job! 🎉
              </h3>
              <p className="text-sm text-muted-foreground">
                You've logged {loggedHabits.length} sustainable habit{loggedHabits.length > 1 ? 's' : ''} 
                {isToday ? ' today' : ` on ${format(selectedDate, 'MMM d')}`}, 
                saving {Math.round(totalCO2ForDate * 10) / 10}kg of CO₂!
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}