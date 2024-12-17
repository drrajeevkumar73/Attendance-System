import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const {
      userId,
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
      task13,
      task14,
      task15,
      task16,
      task17,
      task18,
      task19,
      task20,
    } = await req.json();

    const currentTime = new Date();

    // Fetch all users in the specified department
    const RetingUser = await prisma.user.findMany({
      where: {
        id: {
          equals: userId,
          mode: "insensitive",
        },
      },
    });

    const retinRes= await Promise.all(
      RetingUser.map(async (user) => {
        // Check the last task created or updated for the user
        const lastTask = await prisma.reting.findFirst({
          where: { userId: user.id },
          orderBy: { createdAt: "desc" },
        });

        // If a task exists, calculate the time difference
        if (lastTask) {
          // Get the original creation time (ignore any updates or edits)
          const originalCreationTime = new Date(lastTask.createdAt);

          const timeDiffInMs = currentTime.getTime() - originalCreationTime.getTime();

          // Convert time difference from milliseconds to hours
          const timeDiffInHours = timeDiffInMs / (1000 * 60 * 60); // Converts to hours

          // If the last task was created less than 24 hours ago, update the existing task
          if (timeDiffInHours < 24) {
            return prisma.reting.update({
              where: { id: lastTask.id },
              data: {
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
                task13,
                task14,
                task15,
                task16,
                task17,
                task18,
                task19,
                task20,
              },
            });
          }
        }

        // Otherwise, create a new task (if 24 hours or more have passed since the last task)
        return prisma.reting.create({
          data: {
            userId: user.id,
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
            task13,
            task14,
            task15,
            task16,
            task17,
            task18,
            task19,
            task20,
          },
        });
      })
    );

    return NextResponse.json(
      {
        success: true,
        message: "Reting successfully created or updated for staff.",
        retinRes
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error(
      "Error occurred:",
      typeof error === "object" ? JSON.stringify(error, null, 2) : error
    );
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error.",
      },
      { status: 500 }
    );
  }
}







