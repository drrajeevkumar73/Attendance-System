import { validateRequest } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { user } = await validateRequest();

    if (!user) throw new Error("Unauthorized");

    // Calculate IST time using Intl.DateTimeFormat
    const now = new Date();
    const options = { timeZone: "Asia/Kolkata", hour12: false };
    const formatter = new Intl.DateTimeFormat("en-US", {
      ...options,
      hour: "numeric",
      minute: "numeric",
    });

    const [hour, minute] = formatter.formatToParts(now).map((part) => parseInt(part.value) || 0);
    const currentTimeIST = new Date(now.setHours(hour, minute));
    const currentHour = currentTimeIST.getHours();
    const currentMinute = currentTimeIST.getMinutes();
    const currentTimeInMinutes = currentHour * 60 + currentMinute;

    console.log("Current Time in IST:", currentTimeIST);
    console.log("Current Time in Minutes:", currentTimeInMinutes);

    // Check if current time is between 9:00 AM and 3:00 PM
    const startOfEntry = 540; // 9:00 AM in minutes
    const endOfEntry = 1080;  // 3:00 PM in minutes
    if (currentTimeInMinutes < startOfEntry || currentTimeInMinutes > endOfEntry) {
      return NextResponse.json({
        success: false,
        message: "Entry is allowed only between 9:00 AM to 3:00 PM.",
      });
    }

    // Get today's entry for the user
    const todayStart = new Date(currentTimeIST.setHours(0, 0, 0, 0));
    const todayEnd = new Date(currentTimeIST.setHours(23, 59, 59, 999));

    const existingEntry = await prisma.useentry.findFirst({
      where: {
        userId: user.id,
        createdAt: {
          gte: todayStart,
          lte: todayEnd,
        },
      },
    });

    if (existingEntry) {
      return NextResponse.json({
        success: false,
        message: "You've already entered for today.",
        status: existingEntry.status, // Return existing status if needed
      });
    }

    // Define entry time ranges in minutes
    const onTimeStart = 540; // 9:00 AM in minutes
    const onTimeEnd = 615;   // 10:15 AM in minutes
    const lateStart = 620;   // 10:20 AM in minutes

    let status = "";
    let lateMinutes = 0;

    if (currentTimeInMinutes >= onTimeStart && currentTimeInMinutes <= onTimeEnd) {
      status = "on-time";
    } else if (currentTimeInMinutes >= lateStart) {
      status = "late";
      lateMinutes = currentTimeInMinutes - onTimeEnd; // Calculate late minutes
    }

    // Store entry in the database
    await prisma.useentry.create({
      data: {
        userId: user.id,
        status,
        lateMinutes, // Store late minutes in the database
      },
    });

    // Convert late minutes to hours and minutes for response
    const lateHours = Math.floor(lateMinutes / 60);
    const lateRemainingMinutes = lateMinutes % 60;

    return NextResponse.json({
      success: true,
      message: "Entry recorded successfully.",
      status,
      lateMinutes: lateMinutes
        ? `${lateHours > 0 ? `${lateHours} hour${lateHours > 1 ? "s" : ""} ` : ""}${
            lateRemainingMinutes > 0 ? `${lateRemainingMinutes} minute${lateRemainingMinutes > 1 ? "s" : ""}` : ""
          }`
        : "No delay",
    });
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
