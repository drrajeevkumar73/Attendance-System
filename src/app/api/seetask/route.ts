import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { formatRelativeMonth } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) { 
  try {
    const { monthname } = await req.json();
   
    const { user } = await validateRequest();
    if (!user) throw Error("unathorized");

    const userData = await prisma.user.findFirst({
      where: {
        id: user.id,
      },
      select: {
        displayname: true,
        dipartment: true,
        StaffWork: {
          select: {
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

            createdAt: true,
          },
        },
      },
    });

    const d = userData?.StaffWork.filter((v: any) => {
      if (monthname && monthname !== "Today") {
        // Filter by the provided monthname
        return monthname === formatRelativeMonth(v.createdAt);
      } else {
        // Filter for today's work
        const today = new Date(); // Current date
        const createdAt = new Date(v.createdAt); // Convert createdAt to Date object
    
        // Compare year, month, and date
        return (
          today.getFullYear() === createdAt.getFullYear() &&
          today.getMonth() === createdAt.getMonth() &&
          today.getDate() === createdAt.getDate()
        );
      }
    });
    


    const uniqueDates = new Set(
      d?.map((v: any) => v.createdAt.toISOString().split("T")[0]), // Extract date portion
    );
   
    return NextResponse.json({
      department: userData?.dipartment,
      displanem: userData?.displayname,
      totalwork: uniqueDates.size,
      userdata: d,
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
