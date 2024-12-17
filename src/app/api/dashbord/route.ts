import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { formatRelativeMonth } from "@/lib/utils"; // Assuming this formats the date to "January", "February" etc.
import { calenderSchema } from "@/lib/vallidation";
import { NextRequest, NextResponse } from "next/server";
import { parse } from "date-fns";

export async function POST(req: NextRequest) {
  try {
    const { user } = await validateRequest();

    if (!user) throw Error("unauthorized");

    const { monthname } = await req.json();
    const body = calenderSchema.parse({ monthname });

    const userdata: any = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        dipartment:true,
        displayname:true,
        Todayswork: {
          select: {
            content: true,
            createdAt: true,
          },
          orderBy:{
            createdAt:"desc"
          }
        },
        Atendace: {
          select: {
            status: true,
            createdAt: true,
          },
        },
      },
    });

    if (!userdata) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    // Month-wise filtering
    const filteredTodaysWork = userdata.Todayswork?.filter(
      (work: any) => formatRelativeMonth(work.createdAt) === body.monthname,
    );

    const filteredAttendance = userdata.Atendace?.filter(
      (att: any) => formatRelativeMonth(att.createdAt) === body.monthname,
    );

    const totalAdence = filteredAttendance.filter((v: any) => {
      if (v.status !== "absent") return v.status;
    });



  
      return NextResponse.json({
        totalPresent: totalAdence.length, // Unique days count
        data: filteredTodaysWork, // All records for the month
      });
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
}
