import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { dipartment } = await req.json();

    const autoSelect = await prisma.user.findFirst({
      where: {
        dipartment: {
          equals: dipartment,
          mode: "insensitive",
        },
      },
      select: {
        dipartment: true,
        StaffWork: {
          select: {
            userId: true,
            task1: true,
            task2: true,
            task3: true,
            task4: true,
            task5: true,
            task6: true,
            task7: true,
            task8: true,
            task9: true,
            task10: true,
            task11: true,
            task12: true,
            task13: true,
            task14: true,
            task15: true,
            task16: true,
            task17: true,
            task18: true,
            task19: true,
            task20: true,
          },
        },
      },
    });

    return NextResponse.json(autoSelect);
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
