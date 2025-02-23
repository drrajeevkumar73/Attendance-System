import { validateRequest } from "@/auth"; // Authentication middleware
import prisma from "@/lib/prisma"; // Prisma client
import { NextRequest, NextResponse } from "next/server"; // Next.js server types
import moment from "moment-timezone"; // Moment.js for timezone handling
import nodemailer from "nodemailer";
import SendTelelcaller from "../../../../email/SendTelelcaller";
import { render } from "@react-email/components";

export async function POST(req: NextRequest) {
  try {
    // Step 1: Validate Request and get the user
    const { user } = await validateRequest();
    if (!user) {
      throw new Error("Unauthorized");
    }

    // Step 2: Parse request payload
    const { date, task1, task2, task3, task4, task5, task6, task7, task8 } =
      await req.json();

    // Set timezone to Asia/Kolkata
    const currentTime = moment().tz("Asia/Kolkata");

    // Define restricted time range (8:00 PM to 10:00 AM)
    // Define restricted time range (8:00 PM to 10:00 AM)
    const restrictedStart = moment(currentTime)
      .tz("Asia/Kolkata")
      .startOf("day")
      .add(20, "hours"); // 8:00 PM
    const restrictedEnd = moment(currentTime)
      .tz("Asia/Kolkata")
      .startOf("day")
      .add(10, "hours")
      .add(1, "day"); // 10:00 AM next day

    // Check if current time is within the restricted range
    if (currentTime.isBetween(restrictedStart, restrictedEnd, "minute", "[)")) {
      return NextResponse.json(
        {
          success: false,
          message: "You cannot add data between 8:00 PM and 10:00 AM.",
        },
        { status: 403 },
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
        { status: 400 },
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
    const existingEntry = await prisma.telecaller.findFirst({
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
        { status: 403 },
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
    await prisma.telecaller.create({
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
        createdAt,
      },
    });

    const userTel = await prisma.user.findFirst({
      where: {
        id: user.id,
      },
    });
    if (!userTel) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }
    const userdata = await prisma.telecaller.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    if (!userdata) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }
    // ✅ Nodemailer Transporter Setup for Zoho Mail
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com", // ✅ Ensure it's smtp.zoho.com
      port: 465, // ✅ SSL ke liye 465 ya TLS ke liye 587
      secure: true, // ✅ 465 port ke liye true, 587 ke liye false
      auth: {
        user: process.env.EMAIL_USER, // ✅ .env se email lo
        pass: process.env.EMAIL_PASS, // ✅ .env se App Password lo (Zoho ke app password)
      },
    });

    const emailHtml = await render(
      SendTelelcaller({
        userdata: userdata,
        username: userTel.displayname,
      }),
    );

    // ✅ Email Options
    const mailOptions = {
      from: `"Abhi Health Care👨‍💻" <${process.env.EMAIL_USER}>`,
      to: `hrm@rajeevclinic.com`,
      subject: `${userTel?.displayname} Telecaller Data`,
      html: emailHtml,
    };

    // ✅ Email Send karo (await lagao)
    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Tasks added successfully.",
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 },
    );
  }
}
