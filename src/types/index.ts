import { Database } from "@/integrations/supabase/types";

// Database types from Supabase
export type HabitType = Database['public']['Tables']['habit_types']['Row'];
export type HabitLog = Database['public']['Tables']['habit_logs']['Row'];
export type Profile = Database['public']['Tables']['profiles']['Row'];

// Insert types for creating new records
export type HabitLogInsert = Database['public']['Tables']['habit_logs']['Insert'];
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];

// Authentication types
export interface User {
  id: string;
  email?: string;
  created_at?: string;
}

export interface Session {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  user: User;
}