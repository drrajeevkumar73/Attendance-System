// import moment from "moment-timezone";
// import prisma from "@/lib/prisma";
// import { NextRequest, NextResponse } from "next/server";
// import { validateRequest } from "@/auth";
// import { formSchema } from "@/lib/vallidation";

// export async function POST(req: NextRequest) {
//   try {
//     const { user } = await validateRequest();
//     if (!user) throw new Error("unauthorized");

//     const { content } = await req.json();
//     const data = formSchema.parse({ content });

//     // Set timezone to India (Asia/Kolkata)
//     const currentDate = moment().tz('Asia/Kolkata'); // Set current date and time in India
//     const currentHour = currentDate.hour(); // Get current hour in India

//     // Define time ranges, including 6 PM - 8 PM
//     const timeRanges = [
//       { start: 10, end: 12 }, // 10 AM to 12 PM
//       { start: 12, end: 14 }, // 12 PM to 2 PM
//       { start: 14, end: 16 }, // 2 PM to 4 PM
//       { start: 16, end: 18 }, // 4 PM to 6 PM
//       { start: 18, end: 20 }, // 6 PM to 8 PM
//     ];

//     // Determine the current time range
//     const timeRange = timeRanges.find(
//       (range) => currentHour >= range.start && currentHour < range.end,
//     );

//     if (!timeRange) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Invalid time range for task submission.",
//         },
//         { status: 400 },
//       );
//     }

//     // Restrict to one task submission per time range
//     const existingTask = await prisma.todayswork.findFirst({
//       where: {
//         userId: user.id,
//         createdAt: {
//           gte: currentDate.clone().startOf('hour').set('hour', timeRange.start).toDate(),
//           lte: currentDate.clone().endOf('hour').set('hour', timeRange.end).toDate(),
//         },
//       },
//     });

//     if (existingTask) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: `You can only submit one task between ${timeRange.start}:00 and ${timeRange.end}:00.`,
//         },
//         { status: 400 },
//       );
//     }

//     // Save the task for the current slot
//     const savedTask = await prisma.todayswork.create({
//       data: {
//         userId: user.id,
//         content: data.content,
//         createdAt: currentDate.toDate(), // Store in India time
//       },
//     });

//     // Attendance remains tied to the 4 PM - 6 PM slot only
//     if (currentHour >= 16 && currentHour < 18) {
//       let isPresent = true;

//       // Check all previous slots (10 AM to 4 PM) and the 4 PM - 6 PM slot
//       for (let { start, end } of timeRanges.slice(0, 4)) {
//         const slotData = await prisma.todayswork.findFirst({
//           where: {
//             userId: user.id,
//             createdAt: {
//               gte: currentDate.clone().startOf('hour').set('hour', start).toDate(),
//               lte: currentDate.clone().endOf('hour').set('hour', end).toDate(),
//             },
//           },
//         });

//         // Check if slot has valid content
//         if (!slotData || !slotData.content) {
//           isPresent = false;
//           break;
//         }

//         // Count line breaks
//         const breaksCount = (slotData.content.match(/\n/g) || []).length;

//         if (breaksCount < 2) {
//           isPresent = false;
//           break;
//         }
//       }

//       // Save attendance record
//       await prisma.attendance.create({
//         data: {
//           userId: user.id,
//           createdAt: currentDate.toDate(), // Store in India time
//           status: isPresent ? "present" : "absent",
//         },
//       });
//     }

//     return NextResponse.json(savedTask);
//   } catch (error) {
//     console.error("Error occurred:", error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: "Internal server error",
//       },
//       { status: 500 },
//     );
//   }
// }




import moment from "moment-timezone";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/auth";
import { formSchema } from "@/lib/vallidation";

export async function POST(req: NextRequest) {
  try {
    const { user } = await validateRequest();
    if (!user) throw new Error("unauthorized");

    const { content } = await req.json();
    const data = formSchema.parse({ content });

    // Set timezone to India (Asia/Kolkata)
    const currentDate = moment().tz("Asia/Kolkata");
    const currentHour = currentDate.hour();

    // Define time ranges
    const timeRanges = [
      { start: 10, end: 12 }, // 10 AM to 12 PM
      { start: 12, end: 14 }, // 12 PM to 2 PM
      { start: 14, end: 16 }, // 2 PM to 4 PM
      { start: 16, end: 18 }, // 4 PM to 6 PM
      { start: 18, end: 20 }, // 6 PM to 8 PM
    ];

    // Determine current time range
    const timeRange = timeRanges.find(
      (range) => currentHour >= range.start && currentHour < range.end
    );

    if (!timeRange) {
      return NextResponse.json(
        { success: false, message: "Invalid time range for task submission." },
        { status: 400 }
      );
    }

    // Check for duplicate entry in current time range
    const existingEntry = await prisma.todayswork.findFirst({
      where: {
        userId: user.id,
        createdAt: {
          gte: currentDate.clone().startOf("hour").set("hour", timeRange.start).toDate(),
          lte: currentDate.clone().endOf("hour").set("hour", timeRange.end).toDate(),
        },
      },
    });

    if (existingEntry) {
      return NextResponse.json(
        { success: false, message: "Entry already exists for this time range." },
        { status: 400 }
      );
    }

    // Validate `/n` count in content
    const newlineCount = (data.content.match(/\n/g) || []).length;
    if (newlineCount < 1) {
      return NextResponse.json(
        { success: false, message: "Content must contain at least one newline character." },
        { status: 400 }
      );
    }

    // Save task for the current slot
    const savedTask = await prisma.todayswork.create({
      data: {
        userId: user.id,
        content: data.content,
        createdAt: currentDate.toDate(),
      },
    });

    // Attendance calculation only for 4 PM - 6 PM
    if (currentHour >= 16 && currentHour < 18) {
      let isPresent = true;

      // Check all previous slots (10 AM to 4 PM)
      for (let { start, end } of timeRanges.slice(0, 3)) {
        const slotData = await prisma.todayswork.findFirst({
          where: {
            userId: user.id,
            createdAt: {
              gte: currentDate.clone().startOf("hour").set("hour", start).toDate(),
              lte: currentDate.clone().endOf("hour").set("hour", end).toDate(),
            },
          },
        });

        // Validate slot content and `/n` count
        if (!slotData || !slotData.content || (slotData.content.match(/\n/g) || []).length < 1) {
          isPresent = false;
          break;
        }
      }

      // Save attendance
      await prisma.attendance.create({
        data: {
          userId: user.id,
          createdAt: currentDate.toDate(),
          status: isPresent ? "present" : "absent",
        },
      });
    }

    return NextResponse.json(savedTask);
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
