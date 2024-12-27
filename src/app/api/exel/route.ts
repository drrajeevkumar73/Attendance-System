import moment from "moment-timezone";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/auth";
import { formSchema } from "@/lib/vallidation";

export async function POST(req: NextRequest) {
  try {
    const { user } = await validateRequest();
    if (!user) throw new Error("Unauthorized");

    const { content } = await req.json();
    const data = formSchema.parse({ content });

    // Set timezone to India (Asia/Kolkata)
    const currentTime = moment().tz("Asia/Kolkata");

    // Define restricted hours: 8:00 PM to 10:00 AM
    const restrictedStart = currentTime.clone().startOf("day").add(20, "hours"); // 8:00 PM
    const restrictedEnd = currentTime.clone().startOf("day").add(10, "hours").add(1, "day"); // 10:00 AM next day

    // Check if the current time falls within restricted hours
    if (
      currentTime.isAfter(restrictedStart) || 
      currentTime.isBefore(restrictedEnd)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "You cannot submit tasks between 8:00 PM and 10:00 AM.",
        },
        { status: 403 },
      );
    }

    // Restrict to one task submission per time range (based on hours)
    const startOfHour = currentTime.clone().startOf("hour").toDate();
    const endOfHour = currentTime.clone().endOf("hour").toDate();

    const existingTask = await prisma.todayswork.findFirst({
      where: {
        userId: user.id,
        createdAt: {
          gte: startOfHour,
          lte: endOfHour,
        },
      },
    });

    if (existingTask) {
      return NextResponse.json(
        {
          success: false,
          message: "You can only submit one task per hour.",
        },
        { status: 400 },
      );
    }

    // Save the task
    const savedTask = await prisma.todayswork.create({
      data: {
        userId: user.id,
        content: data.content,
        createdAt: currentTime.toDate(),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Task submitted successfully.",
      data: savedTask,
    });
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error.",
      },
      { status: 500 },
    );
  }
}
