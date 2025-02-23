import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { render } from "@react-email/components";
import { NextRequest, NextResponse } from "next/server";
import { TimeSpan, createDate } from "oslo";
import LeaveApplicationEmail from "../../../../email/Sendverifycation";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { user } = await validateRequest();

    if (!user) throw Error(" unathorized");
    const { name1, subject, from, to, deueto, comforming, signaute } =
      await req.json();
    const srno = await prisma.leavform.findMany({
      where: { userId: user.id },
    });
    const userfi=await prisma.user.findFirst({
      where:{
        id:user.id
      },
      select:{
        email:true
      }
    })

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
        name2: signaute,
        expiresAt: createDate(new TimeSpan(2, "d")),
      },
    });
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const finletestmonth = await prisma.leavform.findMany({
      where: {
        userId: user.id,
        createdAt: {
          gte: startOfMonth, // ✅ Current month ke first date se bada ya equal
          lt: endOfMonth, // ✅ Current month ke last date se chhota
        },
        hrsign: {
          not: "", // ✅ Empty string nahi honi chahiye
        },
        depsing: {
          not: "", // ✅ Empty string nahi honi chahiye
        },
      },
    });

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
      LeaveApplicationEmail({
        username: user.displayname,
        userid: user.id,
        leflenghth: finletestmonth.length,
      }),
    );

    // ✅ Email Options
    const mailOptions = {
      from: `"Abhi Health Care👨‍💻" <${userfi?.email}>`,
      to: `${process.env.EMAIL_USER}`,
      subject: "Leave Application Form",
      html: emailHtml,
    };

    // ✅ Email Send karo (await lagao)
    const info = await transporter.sendMail(mailOptions);

    // ✅ Success Response
    return NextResponse.json({
      success: true,
      message: "Email sent successfully!",
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 },
    );
  }
}
