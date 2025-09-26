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
    <div className={cn(
      "flip-card h-48 w-full",
      disabled && "opacity-50 cursor-not-allowed"
    )}>
      <div className="flip-card-inner">
        {/* Front of card */}
        <div className="flip-card-front p-6 text-white flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-3xl drop-shadow-lg">{habit.icon}</span>
              <div>
                <h3 className="font-bold text-lg">{habit.name}</h3>
                <p className="text-sm opacity-90">{habit.description}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-end">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              {habit.co2_saved}kg CO₂
            </Badge>
            {isLogged && (
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5" />
                <span className="text-sm font-medium">Logged</span>
              </div>
            )}
          </div>
        </div>

        {/* Back of card */}
        <div className="flip-card-back p-6 text-white flex flex-col justify-center">
          {!isLogged && !disabled ? (
            <div className="space-y-4">
              {showNotes && (
                <Textarea
                  placeholder="Optional notes about this habit..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[80px] text-sm bg-white/20 border-white/30 text-white placeholder:text-white/70"
                />
              )}
              
              <div className="flex gap-2">
                <Button
                  onClick={handleSubmit}
                  size="sm"
                  className="flex-1 btn-vibrant text-white border-0 font-semibold"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Log Habit
                </Button>
                
                {!showNotes && (
                  <Button
                    onClick={() => setShowNotes(true)}
                    variant="outline"
                    size="sm"
                    className="px-3 bg-white/20 border-white/30 text-white hover:bg-white/30"
                  >
                    Add Note
                  </Button>
                )}
              </div>
            </div>
          ) : isLogged ? (
            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                <Check className="w-8 h-8" />
              </div>
              <span className="text-lg font-bold">Completed!</span>
              <span className="text-sm opacity-90">Great job on your eco habit</span>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <span className="text-lg font-semibold">Hover to interact</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}