"use client";

import { useHabits } from "@/context/habit-context";
import { HabitCard } from "./habit-card";
import { AddHabitDialog } from "./add-habit-dialog";
import { Target } from "lucide-react";

export function HabitList() {
  const { habits } = useHabits();

  if (habits.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-6">
          <Target className="h-10 w-10 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-semibold text-foreground mb-2">No habits yet</h2>
        <p className="text-muted-foreground text-center mb-6 max-w-sm">
          Start building better routines by creating your first habit. Track your progress and build
          lasting streaks.
        </p>
        <AddHabitDialog />
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
      {habits.map((habit) => (
        <HabitCard key={habit.id} habit={habit} />
      ))}
    </div>
  );
}
