import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

const accountSid = process.env.TWILLO_ACCOUNT_SID;
const authToken = process.env.TWILLO_AUTH_TOKEN;
const twilioClient = twilio(accountSid, authToken);

// POST API to initiate a call
export async function POST(req: NextRequest) {
    try {
        // Authenticate user
        const { user } = await validateRequest();
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized access",
            }, { status: 401 });
        }

        const { telecallerId, patientPhone, telecallerPhone } = await req.json();

        // Validate required fields
        if (!telecallerId || !patientPhone || !telecallerPhone) {
            return NextResponse.json({
                success: false,
                message: "Missing required fields: telecallerId, patientPhone, telecallerPhone",
            }, { status: 400 });
        }

        // Validate phone numbers in E.164 format
        const phoneRegex = /^\+\d{10,15}$/;
        if (!phoneRegex.test(patientPhone) || !phoneRegex.test(telecallerPhone)) {
            return NextResponse.json({
                success: false,
                message: "Phone numbers must be in E.164 format (e.g., +14155552671).",
            }, { status: 400 });
        }

        const twimlUrl = `https://e0b8-2405-201-a41a-c804-ac18-7820-928a-3826.ngrok-free.app/api/calltracker?telecallerPhone=${encodeURIComponent(telecallerPhone)}`;

        // Initiate a call using Twilio
        const call = await twilioClient.calls.create({
            to: patientPhone,
            from: telecallerPhone,
            url: twimlUrl,
        });

        console.log(`Call initiated successfully. Call SID: ${call.sid}`);

        // Save call details to the database
        const callLog = await prisma.callLog.create({
            data: {
                userId: user.id,
                telecallerId,
                patientPhone,
                telecallerPhone,
                callSid: call.sid,
                callStatus: call.status || "unknown",
            },
        });

        return NextResponse.json({
            success: true,
            message: "Call initiated successfully",
            data: callLog,
        });
    } catch (error: any) {
        console.error("Error in call tracking API:", error.message || error);
        return NextResponse.json({
            success: false,
            message: error.message || "Internal server error",
        }, { status: 500 });
    }
}

// GET API to handle Twilio callback for call forwarding
export async function GET(req: NextRequest) {
    try {
        const telecallerPhone = req.nextUrl.searchParams.get("telecallerPhone");

        if (!telecallerPhone) {
            return NextResponse.json({
                success: false,
                message: "Missing telecallerPhone parameter",
            }, { status: 400 });
        }

        const xmlResponse = `
            <Response>
                <Dial>${telecallerPhone}</Dial>
            </Response>
        `;

        return new NextResponse(xmlResponse, {
            headers: { "Content-Type": "text/xml" },
        });
    } catch (error: any) {
        console.error("Error generating TwiML XML:", error.message || error);
        return NextResponse.json({
            success: false,
            message: "Internal server error",
        }, { status: 500 });
    }
}
