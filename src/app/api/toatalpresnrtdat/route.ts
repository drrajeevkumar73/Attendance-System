import prisma from "@/lib/prisma";
import { formatRelativeMonth } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { username, monthname } = await req.json();

    // User data fetch karna
    const userdata: any = await prisma.user.findUnique({
      where: { id: username },
      select: {
        dipartment:true,
        displayname:true,
        city:true,
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
        useentry:{
          select:{
            status:true,
            lateMinutes:true,
            createdAt:true
          },
          orderBy:{
            createdAt:'desc'
          }
        }
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
      (work: any) => formatRelativeMonth(work.createdAt) === monthname,
    );

    const filteredAttendance = userdata.Atendace?.filter(
      (att: any) => formatRelativeMonth(att.createdAt) === monthname,
    );

    const totalAdence = filteredAttendance.filter((v: any) => {
      if (v.status !== "absent") return v.status;
    });

    const filteredLatesatus= userdata.useentry?.filter(
      (work: any) => formatRelativeMonth(work.createdAt) === monthname,
    );

    return NextResponse.json({
      success: true,
      data: {
        filteredLatesatus,
        Totalwork: filteredTodaysWork,
        Atendace: totalAdence.length,
        dipartment:userdata.dipartment,
        displayname:userdata.displayname,
        city:userdata.city
      },
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
