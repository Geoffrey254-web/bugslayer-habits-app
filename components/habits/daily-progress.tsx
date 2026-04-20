"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useHabits } from "@/context/habit-context";
import { ProgressRing } from "./progress-ring";
import { getGreeting } from "@/lib/habit-utils";
import { Sparkles, CheckCircle2 } from "lucide-react";

export function DailyProgress() {
  const { getTodayProgress, habits } = useHabits();
  const { completed, total } = getTodayProgress();
  const progress = total > 0 ? (completed / total) * 100 : 0;
  const greeting = getGreeting();
  const allComplete = total > 0 && completed === total;

  if (habits.length === 0) {
    return null;
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <ProgressRing progress={progress} size={140} strokeWidth={12} />
          
          <div className="flex-1 text-center sm:text-left">
            <p className="text-sm text-muted-foreground mb-1">{greeting}</p>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {allComplete ? (
                <span className="flex items-center justify-center sm:justify-start gap-2">
                  <Sparkles className="h-6 w-6 text-amber-500" />
                  All habits complete!
                </span>
              ) : (
                {"Today's Progress"}
              )}
            </h2>
            <p className="text-muted-foreground">
              {completed} of {total} habits completed
            </p>
            
            {allComplete && (
              <div className="mt-4 flex items-center justify-center sm:justify-start gap-2 text-success">
                <CheckCircle2 className="h-5 w-5" />
                <span className="text-sm font-medium">Great job staying consistent!</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
