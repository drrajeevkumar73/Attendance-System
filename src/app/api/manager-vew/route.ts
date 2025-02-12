import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import moment from "moment-timezone";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { monthname, calendarDate } = await req.json();

    // Fetch user data from the database
    const userdata = await prisma.manegar.findMany({
      where: {
        userId: "admin",
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!userdata) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // If calendarDate is provided, filter by that date
    if (calendarDate) {
      // Convert the calendarDate to the start and end of the day in IST
      const startDate = moment
        .tz(`${calendarDate} 00:00:00`, "Asia/Kolkata")
        .toDate();
      const endDate = moment
        .tz(`${calendarDate} 23:59:59`, "Asia/Kolkata")
        .toDate();

      console.log("Start Date (IST):", moment(startDate).format("YYYY-MM-DD HH:mm:ss"));
      console.log("End Date (IST):", moment(endDate).format("YYYY-MM-DD HH:mm:ss"));

      // Filter data based on createdAt (converted to IST)
      const filteredByDate = userdata.filter((work: any) => {
        // Convert createdAt from UTC to IST
        const workDate = moment(work.createdAt).tz("Asia/Kolkata");
        console.log(
          "Work Date (Converted to IST):",
          workDate.format("YYYY-MM-DD HH:mm:ss")
        );

        // Check if the workDate falls within the specified range
        return workDate.isBetween(startDate, endDate, null, "[]"); // inclusive comparison
      });

      console.log("Filtered Data:", filteredByDate);
      return NextResponse.json(filteredByDate);
    }

    // If no calendarDate provided, filter by monthname
    if (monthname) {
      const filteredByMonth = userdata.filter((work: any) => {
        const workMonth = moment(work.createdAt).format("MMMM");
        return workMonth === monthname;
      });

      return NextResponse.json(filteredByMonth);
    }

    return NextResponse.json(
      { success: false, message: "Month or calendar date is required" },
      { status: 400 }
    );
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
