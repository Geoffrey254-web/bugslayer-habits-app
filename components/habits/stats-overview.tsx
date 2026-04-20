"use client";

import { Flame, Target, Trophy, TrendingUp } from "lucide-react";
import { useHabits } from "@/context/habit-context";
import { calculateStats, isCompletedToday } from "@/lib/habit-utils";

export function StatsOverview() {
  const { habits } = useHabits();

  const totalHabits = habits.length;
  const completedToday = habits.filter(isCompletedToday).length;
  const completionPercentage =
    totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0;

  const allStats = habits.map(calculateStats);
  const totalCurrentStreak = allStats.reduce(
    (acc, stat) => acc + stat.currentStreak,
    0
  );
  const longestStreak = Math.max(
    0,
    ...allStats.map((stat) => stat.longestStreak)
  );

  const stats = [
    {
      label: "Today&apos;s Progress",
      value: `${completedToday}/${totalHabits}`,
      subtext: `${completionPercentage}% complete`,
      icon: Target,
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-950/30",
    },
    {
      label: "Active Streaks",
      value: totalCurrentStreak,
      subtext: "Total streak days",
      icon: Flame,
      color: "text-orange-500",
      bgColor: "bg-orange-50 dark:bg-orange-950/30",
    },
    {
      label: "Best Streak",
      value: longestStreak,
      subtext: "Days in a row",
      icon: Trophy,
      color: "text-amber-500",
      bgColor: "bg-amber-50 dark:bg-amber-950/30",
    },
    {
      label: "Total Habits",
      value: totalHabits,
      subtext: "Being tracked",
      icon: TrendingUp,
      color: "text-emerald-500",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border border-border bg-card p-4"
        >
          <div className="flex items-center gap-2">
            <div className={`rounded-lg p-2 ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </div>
          <p className="mt-3 text-2xl font-semibold text-foreground">
            {stat.value}
          </p>
          <p className="text-xs text-muted-foreground">{stat.subtext}</p>
        </div>
      ))}
    </div>
  );
}
