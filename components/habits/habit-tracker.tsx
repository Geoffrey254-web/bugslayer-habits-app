"use client";

import { HabitProvider } from "@/context/habit-context";
import { Header } from "./header";
import { DailyProgress } from "./daily-progress";
import { HabitList } from "./habit-list";

export function HabitTracker() {
  return (
    <HabitProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto flex flex-col gap-6">
            <DailyProgress />
            <HabitList />
          </div>
        </main>
        <footer className="border-t py-4">
          <p className="text-center text-sm text-muted-foreground">
            Built with consistency in mind
          </p>
        </footer>
      </div>
    </HabitProvider>
  );
}
