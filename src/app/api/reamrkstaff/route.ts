import moment from "moment-timezone";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { idx, attendance } = await req.json();

    // Set current time in UTC
    const currentUTC = moment.utc();

    // Define time range for 4 PM to 6 PM (India Time)
    const todayStartUTC = moment
      .tz([currentUTC.year(), currentUTC.month(), currentUTC.date(), 16, 0], "Asia/Kolkata")
      .utc()
      .toDate();
    const todayEndUTC = moment
      .tz([currentUTC.year(), currentUTC.month(), currentUTC.date(), 18, 0], "Asia/Kolkata")
      .utc()
      .toDate();

    // Define allowed update time range (6 PM to 12 AM India Time)
    const updateStartUTC = moment
      .tz([currentUTC.year(), currentUTC.month(), currentUTC.date(), 18, 0], "Asia/Kolkata")
      .utc()
      .toDate();
    const updateEndUTC = moment
      .tz([currentUTC.year(), currentUTC.month(), currentUTC.date(), 23, 59, 59], "Asia/Kolkata")
      .utc()
      .toDate();

    console.log("Today Start (UTC):", todayStartUTC);
    console.log("Today End (UTC):", todayEndUTC);
    console.log("Update Start (UTC):", updateStartUTC);
    console.log("Update End (UTC):", updateEndUTC);

    // Fetch attendance record
    const record = await prisma.attendance.findFirst({
      where: {
        userId: idx,
        createdAt: {
          gte: todayStartUTC,
          lt: todayEndUTC,
        },
      },
    });

    console.log("Fetched Record:", record);

    // If no record found
    if (!record) {
      return NextResponse.json(
        { success: false, message: "No attendance record found for 4 PM to 6 PM today." },
        { status: 404 }
      );
    }

    // Check if update is allowed (current time must be between 6 PM and 12 AM)
    const currentTime = currentUTC.toDate();
    if (currentTime < updateStartUTC || currentTime > updateEndUTC) {
      return NextResponse.json(
        { success: false, message: "Attendance update is allowed only between 6 PM and 12 AM." },
        { status: 403 }
      );
    }

    // Update the attendance status
    const updatedRecord = await prisma.attendance.update({
      where: { id: record.id },
      data: { status: attendance },
    });

    return NextResponse.json({
      success: true,
      data: updatedRecord,
      message: "Attendance record successfully updated.",
    });
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
