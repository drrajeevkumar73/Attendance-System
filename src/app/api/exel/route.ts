import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import moment from "moment-timezone";

export async function POST(req: NextRequest) {
  try {
    const { user } = await validateRequest();
    if (!user) {
      throw Error("unauthorized");
    }

    // Get current time in IST
    const currentTime = moment().tz("Asia/Kolkata");
    const currentHour = currentTime.hour(); // 24-hour format
    const currentMinutes = currentTime.minute();

    // // Block entries between 8 PM (20:00) to 9:59 AM (09:59)
    if (
      (currentHour >= 20 && currentHour <= 23) || // 8 PM to Midnight
      (currentHour >= 0 && currentHour < 10) // Midnight to 9:59 AM
    ) {
      return NextResponse.json(
        { success: false, message: "Data entry is not allowed between 8 PM and 9:59 AM (IST)." },
        { status: 403 }
      );
    }

    const {
      task1,
      task2,
      task3,
      task4,
      task5,
      task6,
    
    } = await req.json();

    await prisma.telecaller.create({
      data: {
        userId: user.id,
        task1,
        task2,
        task3,
        task4,
        task5,
        task6,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Task created successfully",
    });
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 },
    );
  }
}
