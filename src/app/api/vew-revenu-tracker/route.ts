import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { formatRelativeMonth } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { monthname, username } = await req.json();

    const { user } = await validateRequest();
    if (!user) throw Error("unathorized");

    const userData = await prisma.revenuetracker.findMany({
      where: {
        userId: username,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const filteredTodaysWork = userData.filter(
      (work: any) => formatRelativeMonth(work.createdAt) === monthname,
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
