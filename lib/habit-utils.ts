export const HABIT_COLORS = [
  { name: "Emerald", value: "#10b981" },
  { name: "Blue", value: "#3b82f6" },
  { name: "Amber", value: "#f59e0b" },
  { name: "Rose", value: "#f43f5e" },
  { name: "Violet", value: "#8b5cf6" },
  { name: "Cyan", value: "#06b6d4" },
];

export const HABIT_ICONS = [
  { name: "Exercise", value: "dumbbell" },
  { name: "Reading", value: "book" },
  { name: "Meditation", value: "brain" },
  { name: "Water", value: "droplet" },
  { name: "Sleep", value: "moon" },
  { name: "Healthy Eating", value: "apple" },
  { name: "Learning", value: "graduation-cap" },
  { name: "Writing", value: "pencil" },
  { name: "Walking", value: "footprints" },
  { name: "Music", value: "music" },
  { name: "Coding", value: "code" },
  { name: "Stretching", value: "heart" },
];

export function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

export function getDateString(daysAgo: number = 0): string {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return formatDate(date);
}

export function getWeekDays(): { date: string; dayName: string; dayNum: number; isToday: boolean }[] {
  const days = [];
  const today = new Date();
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    
    days.push({
      date: formatDate(date),
      dayName: date.toLocaleDateString("en-US", { weekday: "short" }),
      dayNum: date.getDate(),
      isToday: i === 0,
    });
  }
  
  return days;
}

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}
