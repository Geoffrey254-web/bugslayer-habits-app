"use client";

import { useHabits } from "@/context/habit-context";
import { getLast7Days, getDayName } from "@/lib/habit-utils";
import { cn } from "@/lib/utils";

export function WeeklyProgress() {
  const { habits } = useHabits();
  const last7Days = getLast7Days();
  const today = new Date().toISOString().split("T")[0];

  if (habits.length === 0) return null;

  const getCompletionForDay = (date: string) => {
    const completedCount = habits.filter((habit) =>
      habit.completedDates.includes(date)
    ).length;
    return {
      completed: completedCount,
      total: habits.length,
      percentage: Math.round((completedCount / habits.length) * 100),
    };
  };

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <h3 className="mb-4 text-sm font-medium text-muted-foreground">
        Weekly Overview
      </h3>
      <div className="flex justify-between gap-2">
        {last7Days.map((date) => {
          const stats = getCompletionForDay(date);
          const isToday = date === today;
          return (
            <div
              key={date}
              className="flex flex-1 flex-col items-center gap-2"
            >
              <div
                className={cn(
                  "relative flex h-10 w-10 items-center justify-center rounded-full text-xs font-medium transition-all",
                  stats.percentage === 100
                    ? "bg-emerald-500 text-white"
                    : stats.percentage > 0
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"
                    : "bg-muted text-muted-foreground",
                  isToday && "ring-2 ring-primary ring-offset-2 ring-offset-background"
                )}
              >
                {stats.percentage}%
              </div>
              <span
                className={cn(
                  "text-xs",
                  isToday ? "font-medium text-foreground" : "text-muted-foreground"
                )}
              >
                {getDayName(date)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
