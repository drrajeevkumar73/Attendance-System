// import prisma from "@/lib/prisma";
// import { formatRelativeMonth } from "@/lib/utils";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//     try {
//       const { cityname, monthname } = await req.json();
  
//       // Fetch users based on city
//       const userdata = await prisma.user.findMany({
//         where: { city: cityname },
//         select: {
//           id: true,
//           dipartment: true,
//           displayname: true,
//           city: true,
//           createdAt: true,
//         },
//       });
  
//       const userIds = userdata.map((user:any) => user.id);
  
//       const attendance = await prisma.attendance.findMany({
//         where: {
//           userId: { in: userIds },
//           status: "present",
//         },
//       });
  
//       const filteredAttendance = attendance.filter(
//         (att: any) => formatRelativeMonth(att.createdAt) === monthname
//       );
  
//       const attendanceCountByUser = userdata.map((user:any) => ({
//         ...user,
//         presentCount: filteredAttendance.filter(
//           (att: any) => att.userId === user.id
//         ).length,
//       }));
  
//       return NextResponse.json({
//         success: true,
//         userdata: attendanceCountByUser,
//       });
//     } catch (error) {
//       console.error("Error:", error);
//       return NextResponse.json(
//         { success: false, message: "Internal server error." },
//         { status: 500 }
//       );
//     }
//   }
  


//  user id ke sath attendance count bhi aayega yani laga modal ka alag deta hai but sme deta saem.






import prisma from "@/lib/prisma";
import moment from "moment-timezone";
import { NextRequest, NextResponse } from "next/server";

const TIMEZONE = "Asia/Kolkata";

export async function POST(req: NextRequest) {
  try {
    const { cityname, monthname } = await req.json();

    // Fetch users based on city
    const userdata = await prisma.user.findMany({
      where: { city: cityname },
      select: {
        id: true,
        dipartment: true,
        displayname: true,
        city: true,
        createdAt: true,
      },
    });

    const userIds = userdata.map((user: any) => user.id);

    // Determine start and end dates for filtering
    let startDate: string | null = null;
    let endDate: string | null = null;

    const now = moment().tz(TIMEZONE); // Current time in IST

    if (monthname === "Today") {
      startDate = now.startOf("day").toISOString();
      endDate = now.endOf("day").toISOString();
    } else if (monthname === "Yesterday") {
      const yesterday = now.clone().subtract(1, "day");
      startDate = yesterday.startOf("day").toISOString();
      endDate = yesterday.endOf("day").toISOString();
    } else {
      // Handle specific month
      const year = now.year();
      const monthStart = moment.tz(`${monthname} 1, ${year}`, "MMMM D, YYYY", TIMEZONE);
      const monthEnd = monthStart.clone().endOf("month");

      startDate = monthStart.toISOString();
      endDate = monthEnd.toISOString();
    }

    // Fetch attendance data
    const attendance = await prisma.attendance.findMany({
      where: {
        userId: { in: userIds },
        status: "present",
        createdAt: { gte: startDate, lte: endDate },
      },
    });

    // Map attendance count to each user
    const attendanceCountByUser = userdata.map((user: any) => ({
      ...user,
      presentCount: attendance.filter((att: any) => att.userId === user.id).length,
    }));

    return NextResponse.json({
      success: true,
      userdata: attendanceCountByUser,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
