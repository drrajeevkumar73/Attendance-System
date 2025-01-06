import moment from "moment-timezone";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/auth";
import { formSchema } from "@/lib/vallidation";

export async function POST(req: NextRequest) {
  try {
    const { user } = await validateRequest();
    if (!user) throw new Error("unauthorized");

    const { content } = await req.json();
    const data = formSchema.parse({ content });

    // Set timezone to India (Asia/Kolkata)
    const currentDate = moment().tz("Asia/Kolkata");
    const currentHour = currentDate.hour();

    // Define time slots
    const timeSlots = [
      { start: 10, end: 13 }, // 10 AM to 1 PM
      { start: 13, end: 16 }, // 1 PM to 4 PM
      { start: 16, end: 19 }, // 4 PM to 7 PM
    ];

    // Check if current time falls within any slot
    const timeSlot = timeSlots.find(
      (slot) => currentHour >= slot.start && currentHour < slot.end
    );

    if (!timeSlot) {
      return NextResponse.json(
        { success: false, message: "Entries allowed only between 10 AM and 7 PM." },
        { status: 400 }
      );
    }

    // Check for duplicate entry in the current time slot
    const existingEntry = await prisma.todayswork.findFirst({
      where: {
        userId: user.id,
        createdAt: {
          gte: currentDate.clone().set("hour", timeSlot.start).minute(0).second(0).toDate(),
          lte: currentDate.clone().set("hour", timeSlot.end).minute(59).second(59).toDate(),
        },
      },
    });

    if (existingEntry) {
      return NextResponse.json(
        { success: false, message: "Entry already exists for this time slot." },
        { status: 400 }
      );
    }

    // Validate content (minimum 2 points required)
    const newlineCount = (data.content.match(/\n/g) || []).length;
    if (newlineCount < 1) {
      return NextResponse.json(
        { success: false, message: "Content must contain at least 2 points." },
        { status: 400 }
      );
    }

    // Save task for the current slot
    const savedTask = await prisma.todayswork.create({
      data: {
        userId: user.id,
        content: data.content,
        createdAt: currentDate.toDate(),
      },
    });

    // Check attendance for all time slots
    if (currentHour >= 16 && currentHour < 19) {
      let isPresent = true; // Default to present

      // Check 10 AM to 1 PM and 1 PM to 4 PM slots for valid content
      for (let slot of timeSlots.slice(0, 2)) { // Only checking the first two slots (10-1 and 1-4)
        const slotStart = currentDate.clone().set("hour", slot.start).minute(0).second(0).toDate();
        const slotEnd = currentDate.clone().set("hour", slot.end).minute(59).second(59).toDate();

        const slotData = await prisma.todayswork.findFirst({
          where: {
            userId: user.id,
            createdAt: {
              gte: slotStart,
              lte: slotEnd,
            },
          },
        });

        // Check if content is missing or blank
        if (!slotData || !slotData.content || slotData.content.trim() === "") {
          console.log(`Attendance marked as ABSENT: Missing or blank content in slot ${slot.start} - ${slot.end}`);
          isPresent = false;
          break; // If any slot is invalid, set as absent
        }
      }

      // Save attendance based on final status (present or absent)
      const attendanceStatus = isPresent ? "present" : "absent";

      await prisma.attendance.create({
        data: {
          userId: user.id,
          createdAt: currentDate.toDate(),
          status: attendanceStatus,
        },
      });

      console.log(`Attendance saved as ${attendanceStatus}`);
    }

    return NextResponse.json({ success: true, data: savedTask });
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
