import prisma from "@/lib/prisma";
import moment from "moment-timezone";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { username, whichdata, calender, month } = await req.json();
    const decoid = decodeURIComponent(username);

    let startDate: Date, endDate: Date;

    const timeRanges = [
      { label: "10 AM - 1 PM", start: 10, end: 13 },
      { label: "1 PM - 4 PM", start: 13, end: 16 },
      { label: "4 PM - 7 PM", start: 16, end: 19 },
    ];

    if (!calender && !month) {
      throw new Error(
        "Either 'calender' or 'month' is required to fetch data.",
      );
    }

    // Define date range based on `calender` or `month`
    if (!calender) {
      const numericMonth = month.split("-")[1]; // Extract the month from the provided date string
      const year = month.split("-")[0]; // Extract the year

      // Make sure the start and end dates are set correctly for the given month
      startDate = moment
        .tz(`${year}-${numericMonth}-01`, "YYYY-MM-DD", "Asia/Kolkata")
        .startOf("month")
        .toDate();
      endDate = moment
        .tz(`${year}-${numericMonth}-01`, "YYYY-MM-DD", "Asia/Kolkata")
        .endOf("month")
        .toDate();
    } else {
      startDate = new Date(calender);
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 1);
    }

    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);

    // If `whichdata` is 'work', fetch today's work data based on date range
    if (whichdata === "work") {
      const groupedData: {
        date: string;
        timeRanges: Record<string, string[]>;
      }[] = [];

      const currentDate = moment(startDate);
      const lastDate = moment(endDate);

      while (currentDate.isBefore(lastDate)) {
        const dayData: { date: string; timeRanges: Record<string, string[]> } =
          {
            date: currentDate.format("YYYY-MM-DD"),
            timeRanges: {
              "10 AM - 1 PM": [],
              "1 PM - 4 PM": [],
              "4 PM - 7 PM": [],
            },
          };

        // Use Promise.all to run all time range queries concurrently
        const timeRangePromises = timeRanges.map(async (range) => {
          const rangeStartTime = currentDate
            .clone()
            .hour(range.start)
            .minute(0)
            .second(0)
            .tz("Asia/Kolkata", true) // Ensure time zone is Asia/Kolkata
            .toDate();

          const rangeEndTime = currentDate
            .clone()
            .hour(range.end)
            .minute(0)
            .second(0)
            .tz("Asia/Kolkata", true) // Ensure time zone is Asia/Kolkata
            .toDate();

          // Debug logs for time range verification
          console.log(
            `Fetching data for: ${range.label} from ${rangeStartTime} to ${rangeEndTime}`,
          );

          // Fetch data based on the start and end time
          const data = await prisma.todayswork.findMany({
            where: {
              userId: decoid,
              createdAt: {
                gte: rangeStartTime, // Start time (inclusive)
                lt: rangeEndTime, // End time (exclusive)
              },
            },
            select: {
              content: true,
            },
            orderBy: {
              createdAt: "desc",
            },
          });

          // Log the fetched data for debugging
          console.log(`Data for ${range.label}:`, data);

          // Ensure data is mapped correctly to the correct time range
          if (data.length > 0) {
            // If data exists, map to the correct time range
            dayData.timeRanges[range.label] = data.map(
              (entry) => entry.content,
            );
          } else {
            // Ensure empty slots are maintained if no data is found
            dayData.timeRanges[range.label] = [];
          }
        });

        // Wait for all time range queries to finish
        await Promise.all(timeRangePromises);

        // After processing all ranges, push the day's data
        groupedData.push(dayData);

        // Move to the next day
        currentDate.add(1, "day");
      }

      return NextResponse.json(groupedData);
    }

    // If `whichdata` is 'excel', fetch department-based data (for example, 'MIXER')
    else if (whichdata === "excel") {
      const user = await prisma.user.findFirst({
        where: {
          id: decoid,
        },
        select: {
          dipartment: true,
        },
      });

      if (user?.dipartment === "MIXER") {
        const data = await prisma.mixer.findMany({
          where: {
            userId: decoid,
            createdAt: {
              gte: startDate,
              lt: endDate,
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        return NextResponse.json({
          success: true,
          data: data,
          dipartment: "mixer",
        });
      }
      if (user?.dipartment === "TELECALLER DEPT") {
        const data = await prisma.telecaller.findMany({
          where: {
            userId: decoid,
            createdAt: {
              gte: startDate,
              lt: endDate,
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        return NextResponse.json({
          success: true,
          data: data,
          dipartment: "telecaller",
        });
      }
      if (user?.dipartment === "RECEPTIONS") {
        const data = await prisma.reception.findMany({
          where: {
            userId: decoid,
            createdAt: {
              gte: startDate,
              lt: endDate,
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        return NextResponse.json({
          success: true,
          data: data,
          dipartment: "reception",
        });
      }
      if (user?.dipartment === "MEDICINE COUNTER") {
        const data = await prisma.medicene.findMany({
          where: {
            userId: decoid,
            createdAt: {
              gte: startDate,
              lt: endDate,
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        return NextResponse.json({
          success: true,
          data: data,
          dipartment: "medicen",
        });
      }
      if (user?.dipartment === "SHOP RANCHI") {
        const data = await prisma.ranchishop.findMany({
          where: {
            userId: decoid,
            createdAt: {
              gte: startDate,
              lt: endDate,
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        return NextResponse.json({
          success: true,
          data: data,
          dipartment: "ranchi_shop",
        });
      }
      if (user?.dipartment === "HD / OD") {
        const data = await prisma.hdod.findMany({
          where: {
            userId: decoid,
            createdAt: {
              gte: startDate,
              lt: endDate,
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        return NextResponse.json({
          success: true,
          data: data,
          dipartment: "hdod",
        });
      }
      if (user?.dipartment === "ECART") {
        const data = await prisma.ecart.findMany({
          where: {
            userId: decoid,
            createdAt: {
              gte: startDate,
              lt: endDate,
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        return NextResponse.json({
          success: true,
          data: data,
          dipartment: "ecart",
        });
      }
      if (user?.dipartment === "DESIGNER") {
        const data = await prisma.designer.findMany({
          where: {
            userId: decoid,
            createdAt: {
              gte: startDate,
              lt: endDate,
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        return NextResponse.json({
          success: true,
          data: data,
          dipartment: "designer",
        });
      }
      if (user?.dipartment === "ACCOUNTANT") {
        const data = await prisma.accountant.findMany({
          where: {
            userId: decoid,
            createdAt: {
              gte: startDate,
              lt: endDate,
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        return NextResponse.json({
          success: true,
          data: data,
          dipartment: "accountant",
        });
      }
      if (user?.dipartment === "DOCTOR") {
        const d = await prisma.offlinedoctorshop.findMany({
          where: {
            userId: decoid,
            createdAt: {
              gte: startDate,
              lt: endDate,
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        });
        const done = await prisma.onlinedoctorshop.findMany({
          where: {
            userId: decoid,
            createdAt: {
              gte: startDate,
              lt: endDate,
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        return NextResponse.json({
          success: true,
          dipartment: "Doctor",
          data: [{ name: "offline or online" }],
          dataOff: d,
          dataOn: done,
        });
      }
    } else if (whichdata === "attendance") {
      const data = await prisma.user.findMany({
        where: {
          id: decoid,
        },
        select: {
          Atendace: {
            where: {
              createdAt: {
                gte: startDate,
                lt: endDate,
              },
            },
            select: {
              status: true,
              createdAt: true, // Only createdAt is available
            },
          },
          useentry: {
            where: {
              createdAt: {
                gte: startDate,
                lt: endDate,
              },
            },
            select: {
              createdAt: true, // Only createdAt is available
              status: true,
              lateMinutes: true,
            },
          },
        },
      });

      // Aggregate and process data
      const processedData = data.map((user: any) => {
        // Count present entries in Atendace
        const workPresentCount = user.Atendace.filter(
          (att: any) => att.status === "present",
        ).length;

        // Map through useentry to generate the desired structure
        const result = user.useentry.map((entry: any) => ({
          WorkPresentCount: workPresentCount, // Total present entries in Atendace
          PresentCount: user.useentry.length, // Total count of useentry records
          Status: entry.status, // Status from useentry
          createdAt: entry.lateMinutes, // createdAt from useentry
        }));

        return result;
      });

      // Flatten the array to ensure a single-level structure
      const flattenedData = processedData.flat();

      return NextResponse.json(flattenedData);
    }
  } catch (error: any) {
    console.error("Error:", error.message || error);
    return NextResponse.json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
}
