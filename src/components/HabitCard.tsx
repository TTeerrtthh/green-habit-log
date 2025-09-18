import { useState } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Check } from "lucide-react";
import { HabitType } from "@/types";
import { cn } from "@/lib/utils";

interface HabitCardProps {
  habit: HabitType;
  isLogged: boolean;
  onLog: (habitId: string, notes?: string) => void;
  disabled?: boolean;
}

export function HabitCard({ habit, isLogged, onLog, disabled }: HabitCardProps) {
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState('');

  const handleSubmit = () => {
    onLog(habit.id, notes.trim() || undefined);
    setNotes('');
    setShowNotes(false);
  };

  return (
    <Card className={cn(
      "habit-card cursor-pointer transition-all duration-300",
      isLogged && "bg-success/10 border-success/30",
      disabled && "opacity-50 cursor-not-allowed"
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{habit.icon}</span>
            <div>
              <h3 className="font-semibold text-sm">{habit.name}</h3>
              <p className="text-xs text-muted-foreground">{habit.description}</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-success/20 text-success">
            {habit.co2_saved}kg CO₂
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        {!isLogged && !disabled ? (
          <div className="space-y-3">
            {showNotes && (
              <Textarea
                placeholder="Optional notes about this habit..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[60px] text-sm"
              />
            )}
            
            <div className="flex gap-2">
              <Button
                onClick={handleSubmit}
                size="sm"
                className="flex-1 gradient-success text-white border-0"
              >
                <Plus className="w-4 h-4 mr-1" />
                Log Habit
              </Button>
              
              {!showNotes && (
                <Button
                  onClick={() => setShowNotes(true)}
                  variant="outline"
                  size="sm"
                  className="px-3"
                >
                  Add Note
                </Button>
              )}
            </div>
          </div>
        ) : isLogged ? (
          <div className="flex items-center justify-center py-2">
            <div className="flex items-center space-x-2 text-success">
              <Check className="w-4 h-4" />
              <span className="text-sm font-medium">Logged Today</span>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}