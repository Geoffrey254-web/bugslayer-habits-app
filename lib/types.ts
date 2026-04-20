export interface Habit {
  id: string;
  name: string;
  description?: string;
  icon: string;
  color: string;
  createdAt: string;
  completedDates: string[];
}

export interface HabitStats {
  currentStreak: number;
  longestStreak: number;
  totalCompletions: number;
  completionRate: number;
}

export type HabitColor = 
  | "emerald" 
  | "blue" 
  | "amber" 
  | "rose" 
  | "violet";

export const HABIT_COLORS: Record<HabitColor, string> = {
  emerald: "bg-emerald-500",
  blue: "bg-blue-500",
  amber: "bg-amber-500",
  rose: "bg-rose-500",
  violet: "bg-violet-500",
};

export const HABIT_ICONS = [
  "💪", "📚", "🏃", "💧", "🧘", "✍️", "🎯", "💤", "🥗", "🎨"
];
