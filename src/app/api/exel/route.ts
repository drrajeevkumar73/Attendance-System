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

    const { date, task1, task2, task3, task4, task5, task6 } = await req.json();

    // Set timezone to Asia/Kolkata
    const currentTime = moment.tz("Asia/Kolkata");
    const startAllowedTime = moment.tz("10:00", "HH:mm", "Asia/Kolkata");
    const endAllowedTime = moment.tz("20:00", "HH:mm", "Asia/Kolkata");

    // Check if the current time is within the allowed range
    // if (!currentTime.isBetween(startAllowedTime, endAllowedTime)) {
    //   return NextResponse.json(
    //     {
    //       success: false,
    //       message: "You can add data only between 10:00 AM and 8:00 PM.",
    //     },
    //     { status: 403 }
    //   );
    // }

    // Set default `date` to today if not provided
    const currentDate = date || currentTime.format("YYYY-MM-DD");

    // Validate the date format
    if (!currentDate || !moment(currentDate, "YYYY-MM-DD", true).isValid()) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid date format. Use YYYY-MM-DD or only enter tasks for today or one day before.",
        },
        { status: 400 }
      );
    }

    // Define today's and yesterday's boundaries
    const todayStart = moment.tz("Asia/Kolkata").startOf("day").toDate();
    const todayEnd = moment.tz("Asia/Kolkata").endOf("day").toDate();
    const yesterdayStart = moment.tz("Asia/Kolkata").subtract(1, "days").startOf("day").toDate();
    const yesterdayEnd = moment.tz("Asia/Kolkata").subtract(1, "days").endOf("day").toDate();

    // Check if today's entry exists
    const todayEntry = await prisma.telecaller.findFirst({
      where: {
        userId: user.id,
        createdAt: {
          gte: todayStart,
          lte: todayEnd,
        },
      },
    });

    console.log("Today's entry:", todayEntry);

    // If user is adding for yesterday, ensure today's entry is filled first
    if (!todayEntry && moment(currentDate).isSame(yesterdayStart, "day")) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill today's task first before adding for previous days.",
        },
        { status: 403 }
      );
    }

    // Check if the provided date is valid (only yesterday is allowed if not today)
    if (!moment(currentDate).isSame(todayStart, "day") && !moment(currentDate).isSame(yesterdayStart, "day")) {
      return NextResponse.json(
        {
          success: false,
          message: "You can only add tasks for today or one day before.",
        },
        { status: 403 }
      );
    }

    // Check if an entry for the given date already exists
    const existingEntry = await prisma.telecaller.findFirst({
      where: {
        userId: user.id,
        createdAt: {
          gte: moment.tz(currentDate, "Asia/Kolkata").startOf("day").toDate(),
          lte: moment.tz(currentDate, "Asia/Kolkata").endOf("day").toDate(),
        },
      },
    });

    if (existingEntry) {
      return NextResponse.json(
        {
          success: false,
          message: "You have already submitted tasks for this date.",
        },
        { status: 403 }
      );
    }

    // Correct `createdAt` based on provided date or current time
    const createdAt = moment
      .tz(currentDate, "YYYY-MM-DD", "Asia/Kolkata")
      .set({
        hour: currentTime.hour(),
        minute: currentTime.minute(),
        second: currentTime.second(),
      })
      .toDate();

    console.log("Final createdAt value:", createdAt);

    // Insert data
    await prisma.telecaller.create({
      data: {
        userId: user.id,
        task1,
        task2,
        task3,
        task4,
        task5,
        task6,
        createdAt,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Task created successfully.",
    });
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
