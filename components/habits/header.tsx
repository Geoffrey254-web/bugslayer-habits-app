"use client";

import { Bug } from "lucide-react";
import { AddHabitDialog } from "./add-habit-dialog";
import { useHabits } from "@/context/habit-context";

export function Header() {
  const { habits } = useHabits();

  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-accent-foreground">
              <Bug className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Bugslayer Habits</h1>
              <p className="text-sm text-muted-foreground">Crush your goals daily</p>
            </div>
          </div>
          
          {habits.length > 0 && <AddHabitDialog />}
        </div>
      </div>
    </header>
  );
}
