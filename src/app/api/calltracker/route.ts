import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      telecallerId,
      patientPhone,
      callStartTime,
      callEndTime,
      callDuration,
      callResponse,
    } = body;

    if (!telecallerId || !patientPhone || !callStartTime || !callEndTime) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const callLog = await prisma.callLog.create({
      data: {
        userId:"12",
        telecallerId,
        patientPhone,
        callStartTime: new Date(callStartTime),
        callEndTime: new Date(callEndTime),
        callDuration,
        callResponse,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Call details logged successfully",
      data: callLog,
    });
  } catch (error: any) {
    console.error("Error saving call log:", error.message || error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
