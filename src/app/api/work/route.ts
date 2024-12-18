// import { toZonedTime } from 'date-fns-tz';
// import prisma from '@/lib/prisma';
// import { NextRequest, NextResponse } from 'next/server';
// import { validateRequest } from '@/auth';
// import { formSchema } from '@/lib/vallidation';

// export async function POST(req: NextRequest) {
//   try {
//     const { user } = await validateRequest();
//     if (!user) throw new Error("unauthorized");

//     const { content } = await req.json();
//     const data = formSchema.parse({ content });

//     const timeZone = 'Asia/Kolkata'; // Set your timezone
//     const currentDateUtc = new Date();  // This will be in UTC
//     const currentDate = toZonedTime(currentDateUtc, timeZone);  // Convert to Indian Time (Asia/Kolkata)
    
//     const currentHour = currentDate.getHours();

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
//           gte: new Date(
//             currentDate.getFullYear(),
//             currentDate.getMonth(),
//             currentDate.getDate(),
//             timeRange.start,
//           ),
//           lte: new Date(
//             currentDate.getFullYear(),
//             currentDate.getMonth(),
//             currentDate.getDate(),
//             timeRange.end,
//           ),
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
//         createdAt: currentDate,  // Store in the converted Indian time
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
//               gte: new Date(
//                 currentDate.getFullYear(),
//                 currentDate.getMonth(),
//                 currentDate.getDate(),
//                 start,
//               ),
//               lte: new Date(
//                 currentDate.getFullYear(),
//                 currentDate.getMonth(),
//                 currentDate.getDate(),
//                 end,
//               ),
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
//           createdAt: currentDate, // Save in the converted Indian time
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


import { toZonedTime } from 'date-fns-tz';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { validateRequest } from '@/auth';
import { formSchema } from '@/lib/vallidation';

// Helper function: Get zoned date in India time (Asia/Kolkata)
const getZonedDate = () => {
  const timeZone = 'Asia/Kolkata';
  return toZonedTime(new Date(), timeZone);
};

// Helper function: Check if current hour falls within a valid time range
const getCurrentTimeRange = (currentHour:any) => {
  const timeRanges = [
    { start: 10, end: 12 },
    { start: 12, end: 14 },
    { start: 14, end: 16 },
    { start: 16, end: 18 },
    { start: 18, end: 20 },
  ];

  return timeRanges.find(
    (range) => currentHour >= range.start && currentHour < range.end,
  );
};

// Helper function: Check if a task already exists in the current time range
const checkExistingTask = async (userId:any, zonedDate:any, timeRange:any) => {
  return await prisma.todayswork.findFirst({
    where: {
      userId,
      createdAt: {
        gte: new Date(
          zonedDate.getFullYear(),
          zonedDate.getMonth(),
          zonedDate.getDate(),
          timeRange.start,
        ),
        lte: new Date(
          zonedDate.getFullYear(),
          zonedDate.getMonth(),
          zonedDate.getDate(),
          timeRange.end,
        ),
      },
    },
  });
};

// Helper function: Validate attendance for all slots
const validateAttendance = async (userId:any, zonedDate:any, timeRanges:any) => {
  for (let { start, end } of timeRanges.slice(0, 4)) {
    const slotData = await prisma.todayswork.findFirst({
      where: {
        userId,
        createdAt: {
          gte: new Date(
            zonedDate.getFullYear(),
            zonedDate.getMonth(),
            zonedDate.getDate(),
            start,
          ),
          lte: new Date(
            zonedDate.getFullYear(),
            zonedDate.getMonth(),
            zonedDate.getDate(),
            end,
          ),
        },
      },
    });

    if (!slotData || !slotData.content || (slotData.content.match(/\n/g) || []).length < 2) {
      return false;
    }
  }
  return true;
};

export async function POST(req: NextRequest) {
  try {
    const { user } = await validateRequest();
    if (!user) throw new Error("unauthorized");

    const { content } = await req.json();
    const data = formSchema.parse({ content });

    const zonedDate = getZonedDate();
    const currentHour = zonedDate.getHours();

    const timeRange = getCurrentTimeRange(currentHour);
    if (!timeRange) {
      return NextResponse.json(
        { success: false, message: "Invalid time range for task submission." },
        { status: 400 },
      );
    }

    const existingTask = await checkExistingTask(user.id, zonedDate, timeRange);
    if (existingTask) {
      return NextResponse.json(
        { 
          success: false, 
          message: `You can only submit one task between ${timeRange.start}:00 and ${timeRange.end}:00.` 
        },
        { status: 400 },
      );
    }

    const savedTask = await prisma.todayswork.create({
      data: {
        userId: user.id,
        content: data.content,
        createdAt: zonedDate,
      },
    });

    if (currentHour >= 16 && currentHour < 18) {
      const isPresent = await validateAttendance(user.id, zonedDate, [
        { start: 10, end: 12 },
        { start: 12, end: 14 },
        { start: 14, end: 16 },
        { start: 16, end: 18 },
      ]);

      await prisma.attendance.create({
        data: {
          userId: user.id,
          createdAt: zonedDate,
          status: isPresent ? "present" : "absent",
        },
      });
    }

    return NextResponse.json(savedTask);
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
