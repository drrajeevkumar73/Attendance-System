import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
const EXOTEL_SID = process.env.EXOTEL_SID!;
const EXOTEL_API_KEY = process.env.EXOTEL_API_KEY!;
const EXOTEL_API_TOKEN = process.env.EXOTEL_API_TOKEN!;

export async function GET(req: NextRequest) {
  try {
    const { user } = await validateRequest();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const ssidData = await prisma.callLog.findMany({
      where: {
        userId: user.id,
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
  } catch (error: any) {
    console.error("POST Error:", error.message);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
