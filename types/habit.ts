export interface Habit {
  id: string;
  name: string;
  description?: string;
  color: string;
  icon: string;
  createdAt: string;
  completedDates: string[];
}

export interface HabitStats {
  currentStreak: number;
  longestStreak: number;
  totalCompletions: number;
  completionRate: number;
}

export type HabitFormData = {
  name: string;
  description?: string;
  color: string;
  icon: string;
};
