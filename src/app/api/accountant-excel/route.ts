import { validateRequest } from "@/auth"; // Authentication middleware
import prisma from "@/lib/prisma"; // Prisma client
import { NextRequest, NextResponse } from "next/server"; // Next.js server types
import moment from "moment-timezone"; // Moment.js for timezone handling

export async function POST(req: NextRequest) {
  try {
    // Step 1: Validate Request and get the user
    const { user } = await validateRequest();
    if (!user) {
      throw new Error("Unauthorized");
    }

    // Step 2: Parse request payload
    const {
        date,
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
        task21,
        task22,
        task23,
        task24,
        task25,
        task26,
        task27,
        task28,
        task29,
        task30,
        task31,
        task32,
        task33,
        task34,
        task35,
        task36,
        task37,
        task38,
        task39,
        task40,
        task41,
        task42,
        task43,
        task44,
        task45,
        task46,
        task47,
        task48,
        task49,
        task50,
        task51,
        task52,
        task53,
        task54,
        task55,
        task56,
        task57,
        task58,
        task59,
        task60,
        task61,
        task62,
        task63,
        task64,
        task65,
        task66,
        task67,
        task68,
        task69,
        task70,
        task71,
        task72,
        task73,
        task74,
        task75,
        task76,
        task77,
        task78,
        task79,
        task80,
        task81,
        task82,
        task83,
        task84,
        task85,
        task86,
        task87,
        task88,
        task89,
        task90,
        task91,
        task92,
        task93,
        task94,
        task95,
        task96,
        task97,
        task98,
        task99,
        task100,
        task101,
        task102,
        task103,
        task104,
        task105,
        task106,
        task107,
        task108,
        task109,
        task110,
        task111,
        task112,
        task113,
        task114,
        task115,
        task116,
        task117,
        task118,
        task119,
        task120,
        task121,
        task122,
        task123,
        task124,
        task125
      } = await req.json();
      

    // Set timezone to Asia/Kolkata
    const currentTime = moment().tz("Asia/Kolkata");

    // Define restricted time range (8:00 PM to 10:00 AM)
    // Define restricted time range (8:00 PM to 10:00 AM)
const restrictedStart = moment(currentTime).tz("Asia/Kolkata").startOf("day").add(20, "hours"); // 8:00 PM
const restrictedEnd = moment(currentTime).tz("Asia/Kolkata").startOf("day").add(10, "hours").add(1, "day"); // 10:00 AM next day

// Check if current time is within the restricted range
if (
  currentTime.isBetween(restrictedStart, restrictedEnd, "minute", "[)")
) {
  return NextResponse.json(
    {
      success: false,
      message: "You cannot add data between 8:00 PM and 10:00 AM.",
    },
    { status: 403 }
  );
}


    // Step 3: Set default `date` to today if not provided
    let currentDate = date || currentTime.format("YYYY-MM-DD");

    // Validate the date format
    if (!moment(currentDate, "YYYY-MM-DD", true).isValid()) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid date format. Use YYYY-MM-DD.",
        },
        { status: 400 }
      );
    }

    // Ensure the date is within the current month and not in the future
    const inputDate = moment.tz(currentDate, "YYYY-MM-DD", "Asia/Kolkata");
    const currentMonth = currentTime.format("MM"); // Current month
    if (inputDate.isAfter(currentTime, "day")) {
      return NextResponse.json(
        {
          success: false,
          message: "You cannot add tasks for future dates.",
        },
        { status: 403 },
      );
    }

    // Step 4: Check if an entry already exists for the given date
    const startOfDay = inputDate.startOf("day").toDate();
    const endOfDay = inputDate.endOf("day").toDate();
    const existingEntry = await prisma.accountant.findFirst({
      where: {
        userId: user.id,
        createdAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    if (existingEntry) {
      return NextResponse.json(
        {
          success: false,
          message: "You have already submitted tasks for this date.",
        },
        { status: 403 }
      );
    }

    // Step 5: Set the `createdAt` timestamp for the new entry
    const createdAt = inputDate
      .set({
        hour: currentTime.hour(),
        minute: currentTime.minute(),
        second: currentTime.second(),
      })
      .toDate();

    // Step 6: Insert data into the database
    await prisma.accountant.create({
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
          task21,
          task22,
          task23,
          task24,
          task25,
          task26,
          task27,
          task28,
          task29,
          task30,
          task31,
          task32,
          task33,
          task34,
          task35,
          task36,
          task37,
          task38,
          task39,
          task40,
          task41,
          task42,
          task43,
          task44,
          task45,
          task46,
          task47,
          task48,
          task49,
          task50,
          task51,
          task52,
          task53,
          task54,
          task55,
          task56,
          task57,
          task58,
          task59,
          task60,
          task61,
          task62,
          task63,
          task64,
          task65,
          task66,
          task67,
          task68,
          task69,
          task70,
          task71,
          task72,
          task73,
          task74,
          task75,
          task76,
          task77,
          task78,
          task79,
          task80,
          task81,
          task82,
          task83,
          task84,
          task85,
          task86,
          task87,
          task88,
          task89,
          task90,
          task91,
          task92,
          task93,
          task94,
          task95,
          task96,
          task97,
          task98,
          task99,
          task100,
          task101,
          task102,
          task103,
          task104,
          task105,
          task106,
          task107,
          task108,
          task109,
          task110,
          task111,
          task112,
          task113,
          task114,
          task115,
          task116,
          task117,
          task118,
          task119,
          task120,
          task121,
          task122,
          task123,
          task124,
          task125,
          createdAt,  // Assuming `createdAt` is either from the request or defined elsewhere
        },
      });
      

    return NextResponse.json({
      success: true,
      message: "Tasks added successfully.",
    });

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
