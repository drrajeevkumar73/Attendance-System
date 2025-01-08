import { validateRequest } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Allowed Subnet for office network (static IP or range)
const ALLOWED_SUBNET = "10.45.233.";  // Office private network IP range
const ALLOWED_MAC = "a8:88:1f:07:df:27";  // Office router MAC address (static)

// Function to check if the IP address is within the allowed range
function isAllowedIP(clientIP: string): boolean {
  return clientIP.startsWith(ALLOWED_SUBNET);
}

// Function to check if the MAC address matches the router MAC address
function isAllowedMAC(clientMAC: string | null): boolean {
  return clientMAC === ALLOWED_MAC;
}

export async function POST(req: NextRequest) {
  try {
    const { user } = await validateRequest();

    if (!user) throw new Error("Unauthorized");
    // const allowedIP = "49.37.64.101"; //  office Wi-Fi public IP
    // const clientIP = await axios
    //   .get("https://api.ipify.org?format=json")
    //   .then((res) => res.data.ip);

    // // Check if the client's public IP matches the allowed office Wi-Fi IP
    // const isAllowed = clientIP === allowedIP;
    // console.log("Client IP:", isAllowed);

    

  // Extract client IP from 'x-forwarded-for' header (as NextRequest doesn't have req.ip)
  const clientIPHeader = req.headers.get("x-forwarded-for");

  // If the header is empty, we return an error
  if (!clientIPHeader) {
    throw new Error("Client IP not found in the request");
  }

  // Handle cases where 'x-forwarded-for' might contain multiple IPs (for proxies)
  const clientIP = clientIPHeader.split(",")[0].trim();

  // Debugging: Log the extracted client IP
  console.log("Extracted Client IP:", clientIP);

  // If the request is coming from localhost (development mode), skip the IP check
  if (clientIP === "::1" || clientIP === "127.0.0.1") {
    console.log("Request is from localhost, bypassing office network check.");
  } else {
    // Validate if the IP is in the allowed subnet (e.g., office network)
    if (!isAllowedIP(clientIP)) {
      console.log("Not Office: Request is NOT from the office network.");
      throw new Error("Access denied: Not connected to office network");
    }
  }

  // Validate MAC address (if needed in headers, or can use other methods)
  const clientMAC = req.headers.get("x-router-mac"); // Custom header for MAC address

  if (!isAllowedMAC(clientMAC)) {
    console.log("Not Office: Request is NOT from the correct router.");
    throw new Error("Access denied: Not connected through the office router");
  }

  console.log("Office: Request is from the office network.");


    const now = new Date();
    const options = { timeZone: "Asia/Kolkata", hour12: false };
    const formatter = new Intl.DateTimeFormat("en-US", {
      ...options,
      hour: "numeric",
      minute: "numeric",
    });

    const parts = formatter.formatToParts(now);
    const hour = parseInt(
      parts.find((part) => part.type === "hour")?.value || "0",
    );
    const minute = parseInt(
      parts.find((part) => part.type === "minute")?.value || "0",
    );
    const currentTimeInMinutes = hour * 60 + minute;

    // Entry allowed only between 9:00 AM and 3:00 PM
    const startOfEntry = 540; // 9:00 AM in minutes
    const endOfEntry = 1080; // 3:00 PM in minutes
    if (
      currentTimeInMinutes < startOfEntry ||
      currentTimeInMinutes > endOfEntry
    ) {
      return NextResponse.json({
        success: false,
        message: "Entry is allowed only between 9:00 AM to 5:00 PM.",
      });
    }

    // Get today's entry for the user
    const todayStart = new Date(now.setHours(0, 0, 0, 0));
    const todayEnd = new Date(now.setHours(23, 59, 59, 999));

    const existingEntry = await prisma.useentry.findFirst({
      where: {
        userId: user.id,
        createdAt: {
          gte: todayStart,
          lte: todayEnd,
        },
      },
    });

    if (existingEntry) {
      return NextResponse.json({
        success: false,
        message: "You've already entered for today.",
        status: existingEntry.status,
      });
    }

    // Define entry time ranges
    const onTimeStart = 540; // 9:00 AM in minutes
    const onTimeEnd = 615; // 10:15 AM in minutes

    let status = "";
    let lateMinutes = 0;

    if (
      currentTimeInMinutes >= onTimeStart &&
      currentTimeInMinutes <= onTimeEnd
    ) {
      status = "on-time";
    } else if (currentTimeInMinutes > onTimeEnd) {
      status = "late";
      lateMinutes = currentTimeInMinutes - onTimeEnd; // Calculate late minutes from 10:15 AM
    }

    // Store entry in the database
    await prisma.useentry.create({
      data: {
        userId: user.id,
        status,
        lateMinutes,
        statusR: "present",
      },
    });

    // Convert late minutes to hours and minutes for response
    const lateHours = Math.floor(lateMinutes / 60);
    const lateRemainingMinutes = lateMinutes % 60;

    return NextResponse.json({
      success: true,
      message: "Entry recorded successfully.",
      status,
      lateMinutes: lateMinutes
        ? `${lateHours > 0 ? `${lateHours} hour${lateHours > 1 ? "s" : ""} ` : ""}${
            lateRemainingMinutes > 0
              ? `${lateRemainingMinutes} minute${lateRemainingMinutes > 1 ? "s" : ""}`
              : ""
          }`
        : "No delay",
    });
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
}
