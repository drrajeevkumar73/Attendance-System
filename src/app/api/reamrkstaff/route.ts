// import prisma from "@/lib/prisma";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   try {
//     const { idx, attendance } = await req.json();

//     // Current Date
//     const currentDate = new Date();

//     // 4 PM to 6 PM time range (today)
//     const todayStart = new Date(
//       currentDate.getFullYear(),
//       currentDate.getMonth(),
//       currentDate.getDate(),
//       16, // 4 PM
//       0,
//       0
//     );
//     const todayEnd = new Date(
//       currentDate.getFullYear(),
//       currentDate.getMonth(),
//       currentDate.getDate(),
//       18, // 6 PM
//       0,
//       0
//     );

//     // Fetch attendance record created between 4 PM and 6 PM today
//     const record = await prisma.attendance.findFirst({
//       where: {
//         userId: idx,
//         createdAt: {
//           gte: todayStart, // Greater than or equal to 4 PM
//           lt: todayEnd,    // Less than 6 PM
//         },
//       },
//     });

//     // If no record found
//     if (!record) {
//       return NextResponse.json(
//         { success: false, message: "No attendance record found for 4 PM to 6 PM today." },
//         { status: 404 }
//       );
//     }

//     // Update the attendance status
//     const updatedRecord = await prisma.attendance.update({
//       where: { id: record.id }, // Attendance record ID
//       data: { status: attendance }, // Update status
//     });

//     return NextResponse.json({
//       success: true,
//       data: updatedRecord,
//       message: "Attendance record successfully updated.",
//     });
//   } catch (error) {
//     console.error("Error occurred:", error);
//     return NextResponse.json(
//       { success: false, message: "Internal server error." },
//       { status: 500 }
//     );
//   }
// }










































import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { idx, attendance } = await req.json();

    // Current Date in UTC
    const currentDate = new Date();

    // Time range for 4 PM to 6 PM today in UTC
    const todayStart = new Date(
      currentDate.getUTCFullYear(),
      currentDate.getUTCMonth(),
      currentDate.getUTCDate(),
      16, // 4 PM UTC
      0, 0
    );
    const todayEnd = new Date(
      currentDate.getUTCFullYear(),
      currentDate.getUTCMonth(),
      currentDate.getUTCDate(),
      18, // 6 PM UTC
      0, 0
    );

    // Fetch attendance record created between 4 PM and 6 PM today
    const record = await prisma.attendance.findFirst({
      where: {
        userId: idx,
        createdAt: {
          gte: todayStart, // Greater than or equal to 4 PM (UTC)
          lt: todayEnd,    // Less than 6 PM (UTC)
        },
      },
    });

    // If no record found
    if (!record) {
      return NextResponse.json(
        { success: false, message: "No attendance record found for 4 PM to 6 PM today." },
        { status: 404 }
      );
    }

    // Update the attendance status
    const updatedRecord = await prisma.attendance.update({
      where: { id: record.id }, // Attendance record ID
      data: { status: attendance }, // Update status
    });

    return NextResponse.json({
      success: true,
      data: updatedRecord,
      message: "Attendance record successfully updated.",
    });
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
