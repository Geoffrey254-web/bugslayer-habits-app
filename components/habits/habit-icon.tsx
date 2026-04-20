"use client";

import {
  Dumbbell,
  BookOpen,
  Brain,
  Droplet,
  Moon,
  Apple,
  GraduationCap,
  Pencil,
  Footprints,
  Music,
  Code,
  Heart,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  dumbbell: Dumbbell,
  book: BookOpen,
  brain: Brain,
  droplet: Droplet,
  moon: Moon,
  apple: Apple,
  "graduation-cap": GraduationCap,
  pencil: Pencil,
  footprints: Footprints,
  music: Music,
  code: Code,
  heart: Heart,
};

interface HabitIconProps {
  icon: string;
  className?: string;
}

export function HabitIcon({ icon, className = "h-5 w-5" }: HabitIconProps) {
  const IconComponent = iconMap[icon] || Heart;
  return <IconComponent className={className} />;
}
