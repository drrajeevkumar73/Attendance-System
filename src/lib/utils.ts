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
  // Define options for the IST time zone conversion
  const options:any = {
    timeZone: 'Asia/Kolkata', // Specify IST time zone
    hour12: true,             // 12-hour clock format
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };

  // Convert the UTC time to IST (Indian Standard Time)
  const istTime = new Date(from).toLocaleString('en-IN', options);

  // Return the formatted IST time
  return istTime;
}

