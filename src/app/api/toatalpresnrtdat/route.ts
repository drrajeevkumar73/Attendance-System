import prisma from "@/lib/prisma";
import { formatRelativeMonth } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { username, monthname } = await req.json();

    // Fetch user data
    const userdata: any = await prisma.user.findUnique({
      where: { id: username },
      select: {
        dipartment: true,
        displayname: true,
        city: true,
        Todayswork: {
          select: {
            content: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        Atendace: {
          select: {
            status: true,
            createdAt: true,
          },
        },
        useentry: {
          select: {
            status: true,
            lateMinutes: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!userdata) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Initialize time slots
    const timeSlots: { [key: string]: any[] } = {
      "10am to 1pm": [],
      "1pm to 4pm": [],
      "4pm to 7pm": [],
    };

    // Get today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Filter works based on monthname
    const filteredTodaysWork = userdata.Todayswork?.filter((work: any) => {
      const createdAt = new Date(work.createdAt);

      if (monthname === "Today") {
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        return createdAt >= today && createdAt < tomorrow;
      } else if (monthname === "Yesterday") {
        const yesterdayStart = new Date(today);
        yesterdayStart.setDate(today.getDate() - 1);
        return createdAt >= yesterdayStart && createdAt < today;
      } else if (monthname) {
        return monthname === formatRelativeMonth(work.createdAt);
      }
      return false;
    });

    // Distribute works into time slots
    filteredTodaysWork?.forEach((work: any) => {
      const createdAt = new Date(work.createdAt);
      const hour = createdAt.getHours();

      if (hour >= 10 && hour < 13) {
        timeSlots["10am to 1pm"].push(work);
      } else if (hour >= 13 && hour < 16) {
        timeSlots["1pm to 4pm"].push(work);
      } else if (hour >= 16 && hour < 19) {
        timeSlots["4pm to 7pm"].push(work);
      }
    });

    // Filter attendance based on the monthname
    const filteredAttendance = userdata.Atendace?.filter((att: any) => {
      const createdAt = new Date(att.createdAt);

      if (monthname === "Today") {
        return createdAt >= today;
      } else if (monthname === "Yesterday") {
        const yesterdayStart = new Date(today);
        yesterdayStart.setDate(today.getDate() - 1);
        return createdAt >= yesterdayStart && createdAt < today;
      } else if (monthname) {
        return monthname === formatRelativeMonth(att.createdAt);
      }
      return false;
    });

    // Filter the attendance based on "absent" status
    const totalAttendance = filteredAttendance?.filter(
      (att: any) => att.status !== "absent"
    );

    // Respond with the segregated data
    return NextResponse.json({
      success: true,
      data: {
        timeSlots,
        Atendace: totalAttendance?.length || 0,
        dipartment: userdata.dipartment,
        displayname: userdata.displayname,
        city: userdata.city,
      },
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
