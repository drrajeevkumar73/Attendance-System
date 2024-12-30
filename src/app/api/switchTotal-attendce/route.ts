import prisma from "@/lib/prisma";  
import moment from "moment-timezone";  
import { NextRequest, NextResponse } from "next/server";  

export async function POST(request: NextRequest) {  
  try {  
    const { cityname, monthname } = await request.json();  

    // Fetch user data based on city  
    const userdata = await prisma.user.findMany({  
      where: { city: cityname },  
      select: { id: true, dipartment: true, displayname: true },  
    });  

    const userid = userdata.map((v) => v.id);  

    // Date filtering based on `monthname`  
    let dateFilter: any = {};  
    const today = moment.tz("Asia/Kolkata").startOf("day");  

    if (monthname === "Today") {  
      const tomorrow = moment(today).add(1, "day");  
      dateFilter = {  
        createdAt: {  
          gte: today.toDate(),  
          lt: tomorrow.toDate(),  
        },  
      };  
    } else if (monthname === "Yesterday") {  
      const yesterday = moment(today).subtract(1, "day");  
      dateFilter = {  
        createdAt: {  
          gte: yesterday.toDate(),  
          lt: today.toDate(),  
        },  
      };  
    } else {  
      // Fetch month number from the `monthname`  
      const monthNumber = moment(monthname, "MMMM").month(); // Convert monthname (e.g., "January") to month index  
      const currentYear = moment().year();  

      const startOfMonth = moment  
        .tz({ year: currentYear, month: monthNumber, day: 1 }, "Asia/Kolkata")  
        .startOf("month");  

      const endOfMonth = moment(startOfMonth).endOf("month");  

      dateFilter = {  
        createdAt: {  
          gte: startOfMonth.toDate(),  
          lt: endOfMonth.toDate(),  
        },  
      };  
    }  

    // Fetch attendance based on user IDs and date filter  
    const userAttendance = await prisma.useentry.findMany({  
      where: {  
        userId: { in: userid },  
        ...dateFilter,  
      },  
      select: {  
        userId: true,  
        status: true,  
        lateMinutes: true, // Include latetime  
        createdAt: true,    // Ensure createdAt is included here  
      },  
    });  

    // Group attendance by user with details, latetime, and count  
    const attendanceCountByUser = userdata.map((user) => {  
      const userAttendanceDetails = userAttendance.filter(  
        (entry) => entry.userId === user.id  
      );  

      // Separate latetime and status calculations  
      const lateEntries = userAttendanceDetails.filter(  
        (entry) => entry.lateMinutes  
      ).length;  

      const statusSummary = userAttendanceDetails.map((entry) => ({  
        status: entry.status,  
        latetime: entry.lateMinutes,  
        date: moment(entry.createdAt).format("DD-MM-YYYY"), // Ensure createdAt is correctly formatted  
      }));  

      return {  
        ...user,  
        presentCount: userAttendanceDetails.length, // Total entries for the user  
        lateCount: lateEntries, // Late entries for the user  
        attendanceDetails: statusSummary, // All attendance records for the user  
      };  
    });  

    return NextResponse.json({  
      success: true,  
      attendanceCountByUser,  
    });  
  } catch (error) {  
    console.error("Error occurred:", error);  
    return NextResponse.json(  
      {  
        success: false,  
        message: "Internal server error",  
      },  
      { status: 500 }  
    );  
  }  
}  
