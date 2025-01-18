import axios from "axios";
import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";

const EXOTEL_SID = process.env.EXOTEL_SID;
const EXOTEL_API_KEY = process.env.EXOTEL_API_KEY;
const EXOTEL_API_TOKEN = process.env.EXOTEL_API_TOKEN;
const EXOPHONE = process.env.EXOPHONE; // Exotel virtual number

export async function POST(req: Request) {
  try {
    const { user } = await validateRequest();

    if (!user) {
      throw new Error("Unauthorized");
    }

    const { telecallerPhone, patientPhone } = await req.json();

    if (!telecallerPhone || !patientPhone) {
      return new Response(
        JSON.stringify({ success: false, message: "Missing required fields" }),
        { status: 400 }
      );
    }

    // Ensure EXOPHONE is not undefined
    if (!EXOPHONE) {
      return new Response(
        JSON.stringify({ success: false, message: "CallerId (EXOPHONE) is not defined" }),
        { status: 400 }
      );
    }

    // Axios request for Exotel API
    const authHeader = Buffer.from(`${EXOTEL_API_KEY}:${EXOTEL_API_TOKEN}`).toString("base64");

    const exotelResponse = await axios.post(
      `https://api.exotel.com/v1/Accounts/${EXOTEL_SID}/Calls/connect`,
      new URLSearchParams({
        From: telecallerPhone,
        To: patientPhone,
        CallerId: EXOPHONE, // Now EXOPHONE is guaranteed to be a string
        TimeLimit: "3600", // Call duration limit in seconds
        CallType: "trans", // Transactional call type
      }),
      {
        headers: {
          Authorization: `Basic ${authHeader}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const callData = exotelResponse.data;

    // Calculate call start and end time (for example purposes)
    const callStartTime = new Date();
    const callEndTime = new Date(callStartTime.getTime() + 120000); // Example: 2-minute call

    // Calculate duration (in seconds)
    const callDuration = Math.floor((callEndTime.getTime() - callStartTime.getTime()) / 1000);

    // Determine the call response (this can be dynamic based on actual call status)
    let callResponse = "Picked"; // Assume it's "Picked" for now, but you can change it based on call status.

    // Determine incoming and outgoing call counts
    const incomingCall = "0"; // Default for outgoing call, can be dynamic if needed
    const outgoingCall = "1"; // For now it's outgoing, adjust as needed

    // Save the call log in the database dynamically
    const callLog = await prisma.callLog.create({
      data: {
        userId: user.id,
        telecallerPhone,
        patientPhone,
        callStartTime,
        callEndTime,
        callDuration,
        callResponse,
        incommingCall: incomingCall,
        outgolingCall: outgoingCall,
      },
    });

    return new Response(JSON.stringify({ success: true, callLog }), { status: 200 });
  } catch (error: any) {
    console.error("Error initiating call:", error.message);
    return new Response(
      JSON.stringify({ success: false, message: error.response?.data?.Message || "Internal server error" }),
      { status: error.response?.status || 500 }
    );
  }
}
