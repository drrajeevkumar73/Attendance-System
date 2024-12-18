import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRelativeMonth(from: Date) {
  return format(from, "MMMM"); // This will give month name like "January", "February"
}

export function formatRelativeMonthDate(from: Date) {
  return format(from, "dd/MM/yy");
}

export function formatRelativeTime(from: Date) {
  return format(from, "h:m:s a");
}

