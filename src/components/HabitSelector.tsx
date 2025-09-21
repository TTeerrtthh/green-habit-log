import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Check } from "lucide-react";
import { HABIT_TYPES, HabitType } from "@/types";

interface HabitSelectorProps {
  selectedHabits: string[];
  onHabitToggle: (habitId: string) => void;
}

export function HabitSelector({ selectedHabits, onHabitToggle }: HabitSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredHabits = HABIT_TYPES.filter(habit =>
    habit.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    habit.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Choose Your Sustainable Habits</h1>
        <p className="text-muted-foreground">
          Select the habits you'd like to track for measurable CO₂ reduction.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search habits..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <Badge variant="outline" className="text-xs">
            {selectedHabits.length} habits selected
          </Badge>
        </div>
      </div>

      {/* Habits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {filteredHabits.map((habit) => {
          const isSelected = selectedHabits.includes(habit.id);
          
          return (
            <Card
              key={habit.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                isSelected
                  ? "ring-2 ring-success bg-success/5"
                  : "hover:ring-1 hover:ring-success/50"
              }`}
              onClick={() => onHabitToggle(habit.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="text-2xl">{habit.icon}</div>
                  {isSelected && (
                    <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
                
                <h3 className="font-semibold mb-2">{habit.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {habit.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="bg-success/20 text-success">
                    {habit.co2_saved}kg CO₂
                  </Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredHabits.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No habits found matching "{searchQuery}"
          </p>
        </div>
      )}
    </div>
  );
}