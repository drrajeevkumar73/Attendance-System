import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";

const TIMEZONE = "Asia/Kolkata"; // Define the timezone

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format month name (e.g., "January", "February")
export function formatRelativeMonth(from: Date | string): string {
  const date = typeof from === "string" ? new Date(from) : from;
  const zonedDate = toZonedTime(date, TIMEZONE);
  return format(zonedDate, "MMMM"); // Example: "December"
}

// Format date (e.g., "17/12/24")
export function formatRelativeMonthDate(from: Date | string): string {
  const date = typeof from === "string" ? new Date(from) : from;
  const zonedDate = toZonedTime(date, TIMEZONE);
  return format(zonedDate, "dd/MM/yy"); // Example: "17/12/24"
}

// Format time (e.g., "3:49:14 PM")
export function formatRelativeTime(from: Date | string): string {
  const date = typeof from === "string" ? new Date(from) : from;
  const zonedDate = toZonedTime(date, TIMEZONE);
  return format(zonedDate, "h:mm:ss a"); // Example: "3:49:14 PM"
}
