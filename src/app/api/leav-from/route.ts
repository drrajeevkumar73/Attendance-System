import { validateRequest } from "@/auth";
import { sendVerificationEmial } from "@/helpers/sendleavemail";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { user } = await validateRequest();

    if (!user) throw Error(" unathorized");
    const { name1, subject, from, to, deueto, comforming, signaute } =
      await req.json();
    const srno = await prisma.leavform.findMany({
      where: { userId: user.id },
    });

    await prisma.leavform.create({
      data: {
        userId: user.id,
        srno: srno.length + 1,
        name1,
        subject,
        from,
        to,
        deueto,
        comforming,
        name2:signaute,
      },
    });
    const emailRes = await sendVerificationEmial(user.displayname,user.id);
    if (!emailRes.success) {
      return NextResponse.json({
          success: false,
          message: emailRes.message
      }, { status: 500 });
  }
    return NextResponse.json(
      { success: true, message: "sent." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 },
    );
  }
}
