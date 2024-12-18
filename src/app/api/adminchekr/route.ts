import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { toZonedTime } from "date-fns-tz";

// Define type for data
interface DataType {
  id: string;
  dob: Date | null;
  content: string;
  userId: string;
  createdAt: Date;
}

// Timezone for `Asia/Kolkata`
const TIMEZONE = "Asia/Kolkata";

// Function to define time slots
function getTimeSlots(currentDate: Date) {
  const date = currentDate.toISOString().split("T")[0]; // YYYY-MM-DD
  return {
    tentwe: [
      new Date(`${date}T10:00:00`),
      new Date(`${date}T12:00:00`),
    ],
    twetwo: [
      new Date(`${date}T12:00:00`),
      new Date(`${date}T14:00:00`),
    ],
    twofour: [
      new Date(`${date}T14:00:00`),
      new Date(`${date}T16:00:00`),
    ],
    foursix: [
      new Date(`${date}T16:00:00`),
      new Date(`${date}T18:00:00`),
    ],
    sixeigh: [
      new Date(`${date}T18:00:00`),
      new Date(`${date}T20:00:00`),
    ],
  };
}

// Function to check if it's reset time
function isResetTime(currentDate: Date): boolean {
  const zonedDate = toZonedTime(currentDate, TIMEZONE);
  const hour = zonedDate.getHours();
  const minute = zonedDate.getMinutes();
  return hour === 9 && minute < 59; // Between 9:00 AM and 9:59 AM IST
}

// Function to fetch data for all slots
async function fetchDataForSlots(
  username: string,
  slots: Record<string, [Date, Date]>
) {
  const result: Record<string, DataType[]> = {
    tentwe: [],
    twetwo: [],
    twofour: [],
    foursix: [],
    sixeigh: [],
  };

  for (const [key, [startTime, endTime]] of Object.entries(slots)) {
    const data = await prisma.todayswork.findMany({
      where: {
        userId: username,
        createdAt: {
          gte: startTime,
          lt: endTime,
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    result[key] = data;
  }
  return result;
}

// Main POST function
export async function POST(req: NextRequest) {
  try {
    const { username } = await req.json();

    // Fetch user details
    const dnameorFname = await prisma.user.findFirst({
      where: {
        id: username,
      },
      select: {
        dipartment: true,
        displayname: true,
      },
    });

    const currentDate = new Date();
    const zonedDate = toZonedTime(currentDate, TIMEZONE); // Convert to IST

    // Check if reset time, return empty data
    if (isResetTime(zonedDate)) {
      return NextResponse.json({
        success: true,
        data: {
          tentwe: [],
          twetwo: [],
          twofour: [],
          foursix: [],
          sixeigh: [],
        },
        dnameorFname,
      });
    }

    // Get time slots
    const timeSlots:any = getTimeSlots(zonedDate);

    // Fetch data for all slots
    const slotData = await fetchDataForSlots(username, timeSlots);

    return NextResponse.json({
      success: true,
      data: slotData,
      dnameorFname,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
