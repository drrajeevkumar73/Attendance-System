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


export function formatRelativeleave(from: string | Date | null | undefined) {
  if (!from) return "Invalid Date"; // ✅ Handle undefined/null values
  const date = new Date(from);
  if (isNaN(date.getTime())) return "Invalid Date"; // ✅ Check invalid date
  return format(date, "dd/MM/yy");
}



