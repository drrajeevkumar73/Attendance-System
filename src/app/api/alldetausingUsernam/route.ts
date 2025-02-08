import prisma from "@/lib/prisma";
import axios from "axios";
import moment from "moment-timezone";
import { NextRequest, NextResponse } from "next/server";
const EXOTEL_SID = process.env.EXOTEL_SID!;
const EXOTEL_API_KEY = process.env.EXOTEL_API_KEY!;
const EXOTEL_API_TOKEN = process.env.EXOTEL_API_TOKEN!;
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
      const numericMonth = month.split("-")[1]; // Extract the month
      const year = month.split("-")[0]; // Extract the year

      // Start Date: 1st day of the month, 12:00 AM IST
      startDate = moment
        .tz(`${year}-${numericMonth}-01 00:00:00`, "Asia/Kolkata")
        .toDate();

      // End Date: Last day of the month, 11:59:59 PM IST
      endDate = moment
        .tz(`${year}-${numericMonth}-01`, "Asia/Kolkata")
        .endOf("month") // Gets the last millisecond of the month
        .toDate();

      // Logs for confirmation
      console.log(
        "Start Date (IST):",
        moment(startDate).format("YYYY-MM-DD HH:mm:ss"),
      );
      console.log(
        "End Date (IST):",
        moment(endDate).format("YYYY-MM-DD HH:mm:ss"),
      );
    } else {
      startDate = new Date(calender);
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 1);
    }

    // If `whichdata` is 'work', fetch today's work data based on date range
    if (whichdata === "Work") {
      const groupedData: {
        date: string;
        timeRanges: Record<string, string[]>;
      }[] = [];

      const currentDate = moment.tz(startDate, "Asia/Kolkata"); // Ensure time zone
      const lastDate = moment.tz(endDate, "Asia/Kolkata"); // Ensure time zone

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
            .millisecond(0)
            .toDate(); // No need for .tz here as currentDate is already in IST

          const rangeEndTime = currentDate
            .clone()
            .hour(range.end)
            .minute(0)
            .second(0)
            .millisecond(0)
            .toDate();

          // Debug logs for time range verification
          console.log(
            `Querying for time range: ${range.label} (${moment(
              rangeStartTime,
            ).format(
              "YYYY-MM-DD HH:mm:ss",
            )} to ${moment(rangeEndTime).format("YYYY-MM-DD HH:mm:ss")})`,
          );

          try {
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
            console.log(`Data for ${range.label} on ${dayData.date}:`, data);

            // Map data to the correct time range
            dayData.timeRanges[range.label] = data.map(
              (entry) => entry.content,
            );
          } catch (error) {
            console.error(`Error fetching data for ${range.label}:`, error);
          }
        });

        // Wait for all time range queries to finish
        await Promise.all(timeRangePromises);

        // Push the processed day's data
        groupedData.push(dayData);

        // Move to the next day
        currentDate.add(1, "day");
      }

      return NextResponse.json(groupedData);
    }

    // If `whichdata` is 'excel', fetch department-based data (for example, 'MIXER')
    else if (whichdata === "Excel") {
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
      if (user?.dipartment === "DIGITAL") {
        const data = await prisma.user.findFirst({
          where: {
            id: decoid,
          },
          select: {
            Telecaller: {
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
            },
            Digital: {
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
            },
          },
        });

        return NextResponse.json({
          success: true,
          data: data,
          dipartment: "digital",
        });
      }
      if (user?.dipartment === "INVENTORY") {
        const data = await prisma.revenuetracker.findMany({
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
          dipartment: "revenuetracker",
        });
      }
    } else if (whichdata === "Attendance") {
      // Parse IST dates with +05:30 offset to get correct UTC times
      const parseISTDate = (
        dateString: string,
        isEndOfDay: boolean = false,
      ) => {
        // Assuming dateString is in 'YYYY-MM-DD' format
        const timePart = isEndOfDay ? "23:59:59" : "00:00:00";
        const isoString = `${dateString}T${timePart}+05:30`;
        return new Date(isoString);
      };

      // Convert IST start and end dates to UTC
      const utcStart = parseISTDate("2025-02-01");
      const utcEnd = parseISTDate("2025-02-28", true);

      const data = await prisma.user.findMany({
        where: { id: decoid },
        select: {
          Atendace: {
            where: {
              createdAt: { gte: utcStart, lt: utcEnd },
            },
            select: { status: true, createdAt: true },
          },
          useentry: {
            where: {
              createdAt: { gte: utcStart, lt: utcEnd },
            },
            select: { createdAt: true, status: true, lateMinutes: true },
          },
        },
      });

      // Rest of your mapping logic...
      const filteredData = data.map((user: any) => {
        const workPresentCount = user.Atendace.filter(
          (att: any) => att.status === "present",
        ).length;

        if (user.useentry.length === 0) {
          return [
            {
              WorkPresentCount: workPresentCount,
              PresentCount: 0,
              Status: "N/A",
              createdAt: "N/A",
            },
          ];
        }

        return user.useentry.map((entry: any) => ({
          WorkPresentCount: workPresentCount,
          PresentCount: user.useentry.length,
          Status: entry.status,
          createdAt: entry.lateMinutes,
        }));
      });

      const flattenedData = filteredData.flat();
      return NextResponse.json(flattenedData);
    } else if (whichdata === "Onboarding-Data") {
      const res = await prisma.uplodthing.findFirst({
        where: {
          userId: decoid,
        },
      });
      console.log(res);

      return NextResponse.json(res);
    } else if (whichdata === "Call-Track") {
      const ssidData = await prisma.callLog.findMany({
        where: {
          userId: decoid,
          createdAt: {
            gte: startDate,
            lt: endDate,
          },
        },
      });
      // Map through the logs and fetch call details from Exotel API
      const mapData = await Promise.all(
        ssidData.map(async (v) => {
          const { data } = await axios.get(
            `https://${EXOTEL_API_KEY}:${EXOTEL_API_TOKEN}@api.exotel.com/v1/Accounts/${EXOTEL_SID}/Calls/${v.callSid}.json`,
          );
          return data;
        }),
      );

      return NextResponse.json(mapData);
    }
  } catch (error: any) {
    console.error("Error:", error.message || error);
    return NextResponse.json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
}
