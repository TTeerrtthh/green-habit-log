// Data types for the Carbon Footprint Tracker

export interface User {
  id: string;
  email: string;
  name: string;
  created_at: Date;
}

export interface HabitType {
  id: string;
  name: string;
  co2_saved: number;
  description: string;
  icon: string;
}

export interface HabitLog {
  id: string;
  user_id: string;
  habit_type: string;
  co2_saved: number;
  date: string; // YYYY-MM-DD format
  notes?: string;
  created_at: Date;
}

export interface DashboardStats {
  total_co2_saved: number;
  current_streak: number;
  total_days: number;
  weekly_average: number;
  monthly_average: number;
}

// Predefined sustainable habits with CO₂ savings
export const HABIT_TYPES: HabitType[] = [
  {
    id: 'cycling',
    name: 'Cycled instead of driving',
    co2_saved: 1.2,
    description: 'Chose bicycle over car for transportation',
    icon: '🚲'
  },
  {
    id: 'plant_meal',
    name: 'Chose plant-based meal',
    co2_saved: 2.5,
    description: 'Selected vegetarian/vegan option',
    icon: '🌱'
  },
  {
    id: 'no_plastic',
    name: 'Avoided single-use plastic',
    co2_saved: 0.1,
    description: 'Used reusable alternatives',
    icon: '♻️'
  },
  {
    id: 'electronics_off',
    name: 'Switched off electronics for 2+ hours',
    co2_saved: 0.5,
    description: 'Reduced energy consumption',
    icon: '🔌'
  },
  {
    id: 'public_transport',
    name: 'Used public transport instead of car',
    co2_saved: 0.8,
    description: 'Chose bus, train, or metro',
    icon: '🚌'
  }
];