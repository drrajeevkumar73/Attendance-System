// import { validateRequest } from "@/auth"; // Authentication middleware
// import prisma from "@/lib/prisma"; // Prisma client
// import { NextRequest, NextResponse } from "next/server"; // Next.js server types
// import moment from "moment-timezone"; // Moment.js for timezone handling

// export async function POST(req: NextRequest) {
//   try {
//     // Step 1: Validate Request and get the user
//     const { user } = await validateRequest();
//     if (!user) {
//       throw new Error("Unauthorized");
//     }

//     // Step 2: Parse request payload
//     const {
//       date,
//       task1,
//       task2,
//       task3,
//       task4,
//       task5,
//       task6,
//       task7,
//       task8,
//       task9,
//       task10,
//       task11,
//       task12,
//       task13,
    
//     } = await req.json();

//     if(task1==="RANCHI"){
//       // Set timezone to Asia/Kolkata
//     const currentTime = moment().tz("Asia/Kolkata");

//     // Define restricted time range (8:00 PM to 10:00 AM)
//     // Define restricted time range (8:00 PM to 10:00 AM)
//     const restrictedStart = moment(currentTime)
//       .tz("Asia/Kolkata")
//       .startOf("day")
//       .add(20, "hours"); // 8:00 PM
//     const restrictedEnd = moment(currentTime)
//       .tz("Asia/Kolkata")
//       .startOf("day")
//       .add(10, "hours")
//       .add(1, "day"); // 10:00 AM next day

//     // Check if current time is within the restricted range
//     if (currentTime.isBetween(restrictedStart, restrictedEnd, "minute", "[)")) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "You cannot add data between 8:00 PM and 10:00 AM.",
//         },
//         { status: 403 },
//       );
//     }

//     // Step 3: Set default `date` to today if not provided
//     let currentDate = date || currentTime.format("YYYY-MM-DD");

//     // Validate the date format
//     if (!moment(currentDate, "YYYY-MM-DD", true).isValid()) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Invalid date format. Use YYYY-MM-DD.",
//         },
//         { status: 400 },
//       );
//     }

//     // Ensure the date is within the current month and not in the future
//     const inputDate = moment.tz(currentDate, "YYYY-MM-DD", "Asia/Kolkata");
//     const currentMonth = currentTime.format("MM"); // Current month
//     if (
//       inputDate.format("MM") !== currentMonth ||
//       inputDate.isAfter(currentTime, "day")
//     ) {
//       return NextResponse.json(
//         {
//           success: false,
//           message:
//             "You can only add tasks for dates in the current month and not for future dates.",
//         },
//         { status: 403 },
//       );
//     }

//     // Step 4: Check if an entry already exists for the given date
//     const startOfDay = inputDate.startOf("day").toDate();
//     const endOfDay = inputDate.endOf("day").toDate();
//     const existingEntry = await prisma.revenuetracker.findFirst({
//       where: {
//         userId: user.id,
//         createdAt: {
//           gte: startOfDay,
//           lte: endOfDay,
//         },
//       },
//     });

//     if (existingEntry) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "You have already submitted tasks for this date.",
//         },
//         { status: 403 },
//       );
//     }

//     // Step 5: Set the `createdAt` timestamp for the new entry
//     const createdAt = inputDate
//       .set({
//         hour: currentTime.hour(),
//         minute: currentTime.minute(),
//         second: currentTime.second(),
//       })
//       .toDate();

//     // Step 6: Insert data into the database
//     await prisma.revenuetracker.create({
//       data: {
//         userId: user.id,
//         task1,
//         task2,
//         task3,
//         task4,
//         task5,
//         task6,
//         task7,
//         task8,
//         task9,
//         task10,
//         task11,
//         task12,
//         task13,
//         createdAt,
//       },
//     });

//     return NextResponse.json({
//       success: true,
//       message: "Tasks added successfully.",
//     });
//     }else  if(task1==="RANCHI SHOP"){
//       // Set timezone to Asia/Kolkata
//     const currentTime = moment().tz("Asia/Kolkata");

//     // Define restricted time range (8:00 PM to 10:00 AM)
//     // Define restricted time range (8:00 PM to 10:00 AM)
//     const restrictedStart = moment(currentTime)
//       .tz("Asia/Kolkata")
//       .startOf("day")
//       .add(20, "hours"); // 8:00 PM
//     const restrictedEnd = moment(currentTime)
//       .tz("Asia/Kolkata")
//       .startOf("day")
//       .add(10, "hours")
//       .add(1, "day"); // 10:00 AM next day

//     // Check if current time is within the restricted range
//     if (currentTime.isBetween(restrictedStart, restrictedEnd, "minute", "[)")) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "You cannot add data between 8:00 PM and 10:00 AM.",
//         },
//         { status: 403 },
//       );
//     }

//     // Step 3: Set default `date` to today if not provided
//     let currentDate = date || currentTime.format("YYYY-MM-DD");

//     // Validate the date format
//     if (!moment(currentDate, "YYYY-MM-DD", true).isValid()) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Invalid date format. Use YYYY-MM-DD.",
//         },
//         { status: 400 },
//       );
//     }

//     // Ensure the date is within the current month and not in the future
//     const inputDate = moment.tz(currentDate, "YYYY-MM-DD", "Asia/Kolkata");
//     const currentMonth = currentTime.format("MM"); // Current month
//     if (
//       inputDate.format("MM") !== currentMonth ||
//       inputDate.isAfter(currentTime, "day")
//     ) {
//       return NextResponse.json(
//         {
//           success: false,
//           message:
//             "You can only add tasks for dates in the current month and not for future dates.",
//         },
//         { status: 403 },
//       );
//     }

//     // Step 4: Check if an entry already exists for the given date
//     const startOfDay = inputDate.startOf("day").toDate();
//     const endOfDay = inputDate.endOf("day").toDate();
//     const existingEntry = await prisma.revenuetracker.findFirst({
//       where: {
//         userId: user.id,
//         createdAt: {
//           gte: startOfDay,
//           lte: endOfDay,
//         },
//       },
//     });

//     if (existingEntry) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "You have already submitted tasks for this date.",
//         },
//         { status: 403 },
//       );
//     }

//     // Step 5: Set the `createdAt` timestamp for the new entry
//     const createdAt = inputDate
//       .set({
//         hour: currentTime.hour(),
//         minute: currentTime.minute(),
//         second: currentTime.second(),
//       })
//       .toDate();

//     // Step 6: Insert data into the database
//     await prisma.revenuetracker.create({
//       data: {
//         userId: user.id,
//         task1,
//         task2,
//         task3,
//         task4,
//         task5,
//         task6,
//         task7,
//         task8,
//         task9,
//         task10,
//         task11,
//         task12,
//         task13,
//         createdAt,
//       },
//     });

//     return NextResponse.json({
//       success: true,
//       message: "Tasks added successfully.",
//     });
//     }

    
//   } catch (error) {
//     console.error("Error:", error);
//     return NextResponse.json(
//       { success: false, message: "Internal server error." },
//       { status: 500 },
//     );
//   }
// }















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
    } = await req.json();

    // Set timezone to Asia/Kolkata
    const currentTime = moment().tz("Asia/Kolkata");

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
    if (
      inputDate.format("MM") !== currentMonth ||
      inputDate.isAfter(currentTime, "day")
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "You can only add tasks for dates in the current month and not for future dates.",
        },
        { status: 403 }
      );
    }

    // Step 4: Check if an entry already exists for the given date
    const startOfDay = inputDate.startOf("day").toDate();
    const endOfDay = inputDate.endOf("day").toDate();

    // Condition to check if RANCHI or RANCHI SHOP data already exists for the given date
    if (task1 === "RANCHI" || task1 === "RANCHI SHOP" || task1 === "PATNA" || task1 === "KOLKATA" || task1 === "GAUR CITY" || task1 === "SPECTRUM" || task1 === "JAGTAULI") {
      const existingCityEntry = await prisma.revenuetracker.findFirst({
        where: {
          task1, // Ensures only checking against the same task1 value (RANCHI or RANCHI SHOP)
          createdAt: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
      });

      if (existingCityEntry) {
        return NextResponse.json(
          {
            success: false,
            message: `An entry for ${task1} already exists on this date.`,
          },
          { status: 403 }
        );
      }
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
    await prisma.revenuetracker.create({
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
        createdAt,
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
