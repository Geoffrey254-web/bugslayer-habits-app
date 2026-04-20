"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { Habit, HabitFormData, HabitStats } from "@/types/habit";

interface HabitContextType {
  habits: Habit[];
  addHabit: (data: HabitFormData) => void;
  deleteHabit: (id: string) => void;
  toggleHabitCompletion: (id: string, date: string) => void;
  isHabitCompletedOnDate: (id: string, date: string) => boolean;
  getHabitStats: (id: string) => HabitStats;
  getTodayProgress: () => { completed: number; total: number };
}

const HabitContext = createContext<HabitContextType | undefined>(undefined);

const STORAGE_KEY = "bugslayer-habits";

function generateId(): string {
  return `habit-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function calculateStreak(completedDates: string[]): number {
  if (completedDates.length === 0) return 0;

  const sortedDates = [...completedDates].sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const mostRecentDate = new Date(sortedDates[0]);
  mostRecentDate.setHours(0, 0, 0, 0);

  if (
    mostRecentDate.getTime() !== today.getTime() &&
    mostRecentDate.getTime() !== yesterday.getTime()
  ) {
    return 0;
  }

  let streak = 1;
  let currentDate = mostRecentDate;

  for (let i = 1; i < sortedDates.length; i++) {
    const prevDate = new Date(currentDate);
    prevDate.setDate(prevDate.getDate() - 1);

    const checkDate = new Date(sortedDates[i]);
    checkDate.setHours(0, 0, 0, 0);

    if (checkDate.getTime() === prevDate.getTime()) {
      streak++;
      currentDate = checkDate;
    } else {
      break;
    }
  }

  return streak;
}

function calculateLongestStreak(completedDates: string[]): number {
  if (completedDates.length === 0) return 0;

  const sortedDates = [...completedDates].sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  let longestStreak = 1;
  let currentStreak = 1;

  for (let i = 1; i < sortedDates.length; i++) {
    const prevDate = new Date(sortedDates[i - 1]);
    const currDate = new Date(sortedDates[i]);

    const diffDays = Math.round(
      (currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 1) {
      currentStreak++;
      longestStreak = Math.max(longestStreak, currentStreak);
    } else if (diffDays > 1) {
      currentStreak = 1;
    }
  }

  return longestStreak;
}

export function HabitProvider({ children }: { children: ReactNode }) {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setHabits(JSON.parse(stored));
      } catch {
        setHabits([]);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
    }
  }, [habits, isLoaded]);

  const addHabit = useCallback((data: HabitFormData) => {
    const newHabit: Habit = {
      id: generateId(),
      name: data.name,
      description: data.description,
      color: data.color,
      icon: data.icon,
      createdAt: new Date().toISOString(),
      completedDates: [],
    };
    setHabits((prev) => [...prev, newHabit]);
  }, []);

  const deleteHabit = useCallback((id: string) => {
    setHabits((prev) => prev.filter((habit) => habit.id !== id));
  }, []);

  const toggleHabitCompletion = useCallback((id: string, date: string) => {
    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id !== id) return habit;

        const isCompleted = habit.completedDates.includes(date);
        return {
          ...habit,
          completedDates: isCompleted
            ? habit.completedDates.filter((d) => d !== date)
            : [...habit.completedDates, date],
        };
      })
    );
  }, []);

  const isHabitCompletedOnDate = useCallback(
    (id: string, date: string) => {
      const habit = habits.find((h) => h.id === id);
      return habit?.completedDates.includes(date) ?? false;
    },
    [habits]
  );

  const getHabitStats = useCallback(
    (id: string): HabitStats => {
      const habit = habits.find((h) => h.id === id);
      if (!habit) {
        return {
          currentStreak: 0,
          longestStreak: 0,
          totalCompletions: 0,
          completionRate: 0,
        };
      }

      const currentStreak = calculateStreak(habit.completedDates);
      const longestStreak = calculateLongestStreak(habit.completedDates);
      const totalCompletions = habit.completedDates.length;

      const createdDate = new Date(habit.createdAt);
      const today = new Date();
      const daysSinceCreation = Math.max(
        1,
        Math.ceil(
          (today.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24)
        )
      );
      const completionRate = Math.round(
        (totalCompletions / daysSinceCreation) * 100
      );

      return {
        currentStreak,
        longestStreak,
        totalCompletions,
        completionRate: Math.min(100, completionRate),
      };
    },
    [habits]
  );

  const getTodayProgress = useCallback(() => {
    const today = new Date().toISOString().split("T")[0];
    const completed = habits.filter((h) =>
      h.completedDates.includes(today)
    ).length;
    return { completed, total: habits.length };
  }, [habits]);

  return (
    <HabitContext.Provider
      value={{
        habits,
        addHabit,
        deleteHabit,
        toggleHabitCompletion,
        isHabitCompletedOnDate,
        getHabitStats,
        getTodayProgress,
      }}
    >
      {children}
    </HabitContext.Provider>
  );
}

export function useHabits() {
  const context = useContext(HabitContext);
  if (context === undefined) {
    throw new Error("useHabits must be used within a HabitProvider");
  }
  return context;
}
