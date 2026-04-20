"use client";

import { Trash2, Flame, Trophy, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { Habit } from "@/types/habit";
import { useHabits } from "@/context/habit-context";
import { getWeekDays } from "@/lib/habit-utils";
import { HabitIcon } from "./habit-icon";
import { cn } from "@/lib/utils";

interface HabitCardProps {
  habit: Habit;
}

export function HabitCard({ habit }: HabitCardProps) {
  const { deleteHabit, toggleHabitCompletion, isHabitCompletedOnDate, getHabitStats } = useHabits();
  const weekDays = getWeekDays();
  const stats = getHabitStats(habit.id);
  const today = new Date().toISOString().split("T")[0];
  const isCompletedToday = isHabitCompletedOnDate(habit.id, today);

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-0">
        <div className="flex items-start gap-4 p-4">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
            style={{ backgroundColor: `${habit.color}20`, color: habit.color }}
          >
            <HabitIcon icon={habit.icon} className="h-6 w-6" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="font-semibold text-foreground truncate">{habit.name}</h3>
                {habit.description && (
                  <p className="text-sm text-muted-foreground truncate">{habit.description}</p>
                )}
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete habit</span>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Habit</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete &quot;{habit.name}&quot;? This action cannot be
                      undone and all progress will be lost.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => deleteHabit(habit.id)}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            <div className="mt-3 flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-sm">
                <Flame className="h-4 w-4 text-orange-500" />
                <span className="font-medium">{stats.currentStreak}</span>
                <span className="text-muted-foreground">day streak</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm">
                <Trophy className="h-4 w-4 text-amber-500" />
                <span className="font-medium">{stats.longestStreak}</span>
                <span className="text-muted-foreground">best</span>
              </div>
            </div>
          </div>

          <Button
            variant={isCompletedToday ? "default" : "outline"}
            size="icon"
            className={cn(
              "h-12 w-12 shrink-0 rounded-xl transition-all",
              isCompletedToday && "bg-success text-success-foreground hover:bg-success/90"
            )}
            onClick={() => toggleHabitCompletion(habit.id, today)}
          >
            <Check className={cn("h-6 w-6", isCompletedToday && "animate-in zoom-in-50")} />
            <span className="sr-only">
              {isCompletedToday ? "Mark as incomplete" : "Mark as complete"}
            </span>
          </Button>
        </div>

        <div className="border-t bg-muted/30 px-4 py-3">
          <div className="flex items-center justify-between gap-1">
            {weekDays.map((day) => {
              const isCompleted = isHabitCompletedOnDate(habit.id, day.date);
              return (
                <button
                  key={day.date}
                  onClick={() => toggleHabitCompletion(habit.id, day.date)}
                  className="flex flex-1 flex-col items-center gap-1 group"
                >
                  <span
                    className={cn(
                      "text-xs",
                      day.isToday ? "font-semibold text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {day.dayName}
                  </span>
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium transition-all",
                      isCompleted
                        ? "text-white"
                        : day.isToday
                        ? "bg-secondary text-secondary-foreground"
                        : "bg-muted text-muted-foreground group-hover:bg-secondary"
                    )}
                    style={isCompleted ? { backgroundColor: habit.color } : undefined}
                  >
                    {isCompleted ? <Check className="h-4 w-4" /> : day.dayNum}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
