import moment from "moment-timezone";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/auth";
import { formSchema } from "@/lib/vallidation";

export async function POST(req: NextRequest) {
  try {
    // Step 1: Validate user request
    const { user } = await validateRequest();
    if (!user) throw new Error("Unauthorized access");

    const res=await prisma.user.findFirst({
      where:{
         id:user.id
      }
    })

    if(!res?.permisionToggal){
      return NextResponse.json({
        message:"You are not in clinic."
      })
    }


    const { content } = await req.json();

   



    const data = formSchema.parse({ content });

    // Step 2: Set timezone to India (Asia/Kolkata)
    const currentDate = moment().tz("Asia/Kolkata");
    const currentHour = currentDate.hour();

    // Step 3: Define time slots
    const timeSlots = [
      { start: 10, end: 13 }, // 10 AM to 1 PM
      { start: 13, end: 16 }, // 1 PM to 4 PM
      { start: 16, end: 19 }, // 4 PM to 7 PM
    ];

    // Step 4: Check if the current time is within the allowed slots
    const timeSlot = timeSlots.find(
      (slot) => currentHour >= slot.start && currentHour < slot.end
    );

    if (!timeSlot) {
      return NextResponse.json(
        { success: false, message: "Entries allowed only between 10 AM and 7 PM." },
        { status: 400 }
      );
    }

    // Step 5: Prevent duplicate entries in the current slot
    const slotStart = currentDate
      .clone()
      .set("hour", timeSlot.start)
      .minute(0)
      .second(0)
      .millisecond(0)
      .toDate();

    const slotEnd = currentDate
      .clone()
      .set("hour", timeSlot.end)
      .minute(59)
      .second(59)
      .millisecond(999)
      .toDate();

    const existingEntry = await prisma.todayswork.findFirst({
      where: {
        userId: user.id,
        createdAt: {
          gte: slotStart,
          lte: slotEnd,
        },
      },
    });

    if (existingEntry) {
      return NextResponse.json(
        { success: false, message: "Entry already exists for this time slot." },
        { status: 400 }
      );
    }

    // Step 6: Validate content (minimum 2 points required)
    const newlineCount = (data.content.match(/\n/g) || []).length;
    if (newlineCount < 1) {
      return NextResponse.json(
        { success: false, message: "Content must contain at least 2 points." },
        { status: 400 }
      );
    }

    // Step 7: Save task for the current slot
    const savedTask = await prisma.todayswork.create({
      data: {
        userId: user.id,
        content: data.content,
        createdAt: currentDate.toDate(),
      },
    });

    // Step 8: Check for attendance only during the 4 PM to 7 PM slot
    if (timeSlot.start === 16) {
      let isPresent = true;

      // Validate 10 AM to 1 PM and 1 PM to 4 PM slots
      for (let slot of timeSlots.slice(0, 2)) {
        const slotStart = currentDate
          .clone()
          .set("hour", slot.start)
          .minute(0)
          .second(0)
          .millisecond(0)
          .toDate();

        const slotEnd = currentDate
          .clone()
          .set("hour", slot.end)
          .minute(59)
          .second(59)
          .millisecond(999)
          .toDate();

        const slotData = await prisma.todayswork.findFirst({
          where: {
            userId: user.id,
            createdAt: {
              gte: slotStart,
              lte: slotEnd,
            },
          },
        });

        if (!slotData || !slotData.content || slotData.content.trim() === "") {
          isPresent = false; // Mark as absent if any slot is invalid
          break;
        }
      }

      // Mark attendance for today
      const todayStart = currentDate.clone().startOf("day").toDate();
      const attendanceStatus = isPresent ? "present" : "absent";

      await prisma.attendance.create({
        data: {
          userId: user.id,
          createdAt: todayStart,
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
