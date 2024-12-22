import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { formatRelativeMonth, formatRelativeMonthDate, formatRelativeTime } from "@/lib/utils";
import { calenderSchema } from "@/lib/vallidation";
import { NextRequest, NextResponse } from "next/server";
import { date } from "zod";

export async function POST(req: NextRequest) {
  try {

    const { user } = await validateRequest();

    if (!user) throw Error("unauthorized");
    const { monthname } = await req.json();
   
    const body = calenderSchema.parse({ monthname });

    const userdata = await prisma.medicene.findMany({
      where: {
        userId: user.id,
      },
      orderBy:{
        createdAt:"desc"
      }
    });

    if (!userdata) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    // Month-wise filtering
    const filteredTodaysWork = userdata.filter(
      (work: any) => formatRelativeMonth(work.createdAt) === body.monthname,
    );
    
    return NextResponse.json(filteredTodaysWork);
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
