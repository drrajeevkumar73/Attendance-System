import { NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/lib/prisma";
import { validateRequest } from "@/auth";

const EXOTEL_SID = process.env.EXOTEL_SID!;
const EXOTEL_API_KEY = process.env.EXOTEL_API_KEY!;
const EXOTEL_API_TOKEN = process.env.EXOTEL_API_TOKEN!;
const EXOPHONE = process.env.EXOPHONE!;

// POST Method to Initiate the Call and Automatically Fetch Call Details
export async function POST(req: Request) {
  try {
    const { user } = await validateRequest();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const { telecallerPhone, patientPhone } = await req.json();

    const dataString = `From=${telecallerPhone}&To=${patientPhone}&CallerId=${EXOPHONE}&Record=true`;

    const { data } = await axios.post(
      `https://${EXOTEL_API_KEY}:${EXOTEL_API_TOKEN}@api.exotel.com/v1/Accounts/${EXOTEL_SID}/Calls/connect.json`,
      dataString,
    );

    const callSid = data.Call.Sid;
    await prisma.callLog.create({
      data: {
        userId: user.id,
        telecallerPhone: telecallerPhone,
        patientPhone: patientPhone,
        callSid: callSid,
      },
    });

    return NextResponse.json(
      { success: true, message: "Call initiated and details stored" },
      { status: 200 },
    );
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
