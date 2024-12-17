import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Backend: POST request handling
export async function POST(req: NextRequest) {
  try {
    const { username } = await req.json();

    const userData = await prisma.user.findFirst({
      where: { id: username },
      select: {
        displayname: true,
        dipartment: true,
        StaffWork: {
          where: { userId: username },
          select: {
            createdAt: true,
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

    return NextResponse.json(userData);
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
