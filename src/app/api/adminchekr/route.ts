import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import moment from "moment-timezone";

// Define type for data
interface DataType {
  id: string;
  dob: Date | null;
  content: string;
  userId: string;
  createdAt: Date;
}

// Function to define time slots
function getTimeSlots(currentDate: Date) {
  const date = currentDate.toISOString().split("T")[0]; // YYYY-MM-DD
  return {
    tentwe: [
      moment.tz(`${date}T10:00:00`, 'Asia/Kolkata').toDate(),
      moment.tz(`${date}T12:00:00`, 'Asia/Kolkata').toDate(),
    ],
    twetwo: [
      moment.tz(`${date}T12:00:00`, 'Asia/Kolkata').toDate(),
      moment.tz(`${date}T14:00:00`, 'Asia/Kolkata').toDate(),
    ],
    twofour: [
      moment.tz(`${date}T14:00:00`, 'Asia/Kolkata').toDate(),
      moment.tz(`${date}T16:00:00`, 'Asia/Kolkata').toDate(),
    ],
    foursix: [
      moment.tz(`${date}T16:00:00`, 'Asia/Kolkata').toDate(),
      moment.tz(`${date}T18:00:00`, 'Asia/Kolkata').toDate(),
    ],
    sixeigh: [
      moment.tz(`${date}T18:00:00`, 'Asia/Kolkata').toDate(),
      moment.tz(`${date}T20:00:00`, 'Asia/Kolkata').toDate(),
    ],
  };
}

// Function to check if it's reset time
function isResetTime(currentDate: Date): boolean {
  const hour = currentDate.getHours();
  const minute = currentDate.getMinutes();
  return hour === 9 && minute < 59;
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
        city:true
      },
    });

    const currentDate = new Date(); // Get current date
    const currentDateInIST = moment(currentDate).tz('Asia/Kolkata').toDate(); // Convert to IST

    // Check if reset time
    if (isResetTime(currentDateInIST)) {
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

    // Get time slots with IST conversion
    const timeSlots: any = getTimeSlots(currentDateInIST);

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
