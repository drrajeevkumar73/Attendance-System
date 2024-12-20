import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
   
    const { user } = await validateRequest();
    if (!user) {
      throw Error("unauthorized");
    }
    const {
      task1,
      task2,
      task3,
      task4,
      task5,
      task6,
      task7,
      task8,
      task9,
      task10,
      task11,
      task12,
    } = await req.json();

        // Current time in hours and minutes
        const currentTime = new Date();
        const currentHour = currentTime.getHours();
        const currentMinutes = currentTime.getMinutes();
    
        // Block entries between 8 PM (20:00) to 9:59 AM (09:59)
        if (
          (currentHour >= 20 && currentHour <= 23) || // 8 PM to Midnight
          (currentHour >= 0 && currentHour < 10) // Midnight to 9:59 AM
        ) {
          return NextResponse.json(
            { success: false, message: "Data entry is not allowed between 8 PM and 9:59 AM." },
            { status: 403 }
          );
        }
    

    await prisma.telecaller.create({
        data:{
            userId:user.id,
            task1,
            task2,
            task3,
            task4,
            task5,
            task6,
            task7,
            task8,
            task9,
            task10,
            task11,
            task12,
        }
    })

    return NextResponse.json({
        success:true,
        message:" Task created successfully",
    })
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 },
    );
  }
}
