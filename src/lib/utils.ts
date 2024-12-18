import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRelativeMonth(from: Date) {
  return format(from, "MMMM"); // This will give month name like "January", "February"
}

// export function formatRelativeMonthDate(from: Date) {
//   return format(from, "dd/MM/yy");
// }

// export function formatRelativeTime(from: Date) {
//   return format(from, "h:m:s a");
// }

export function formatRelativeMonthDate(from: Date) {
  return format(from, "dd/MM/yy");  // Format as dd/MM/yy (Day/Month/Year)
}

export function formatRelativeTime(from: Date) {
  // Ensure that the date is in UTC
  const date = new Date(from);

  // Convert UTC time to IST
  const options:any = {
    timeZone: 'Asia/Kolkata', // Specify IST (Indian Standard Time)
    hour12: true,             // Use 12-hour clock format
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };

  // Convert the date to IST using toLocaleString
  const istTime = date.toLocaleString('en-IN', options);

  // Return the IST formatted time
  return istTime;
}

