// import { NextRequest, NextResponse } from "next/server";
// import nodemailer from "nodemailer";
// import twilio from "twilio";
// export async function GET(req: NextRequest) {
//   try {
//     // ✅ Nodemailer Transporter Setup
//     const transporter = nodemailer.createTransport({
//      host: "smtp.zoho.com",
//       auth: {
//         user: process.env.EMAIL_USER, // ✅ .env se email lo
//         pass: process.env.EMAIL_PASS, // ✅ .env se App Password lo
//       },
//     });

//     // ✅ Email Options
//     const mailOptions = {
//       from: `"Daily Report 👨‍💻" <${process.env.EMAIL_USER}>`,
//       to: "dailyreport.ahh@gmail.com",
//       subject: "Test Email",
//       // text: "Hello Rahul, yeh ek real email hai!",
//       html: "<b>Hello Rahul, yeh ek real email hai!</b>",
//     };

//     // ✅ Email Send karo (await lagao)
//     const info = await transporter.sendMail(mailOptions);

//     // ✅ Success Response
//     return NextResponse.json({
//       success: true,
//       message: "Email sent successfully!",
//       messageId: info.messageId,
//     });


//     // const client = twilio(
//     //     process.env.TWILIO_ACCOUNT_SID,
//     //     process.env.TWILIO_AUTH_TOKEN
//     //   );
  
//     //   const message = await client.messages.create({
//     //     from: "whatsapp:+14155238886", // ✅ Twilio WhatsApp Number
//     //     to:"whatsapp:+918709692232", // ✅ Tumhara WhatsApp Number
//     //     body: "Hello Rahul, yeh WhatsApp pe send ho raha hai! 🚀",
//     //   });
  
//     //   return NextResponse.json({
//     //     success: true,
//     //     message: "WhatsApp message sent successfully!",
//     //     sid: message.sid,
//     //   });
//   } catch (error: any) {
//     // ❌ Error Response
//     return NextResponse.json({
//       success: false,
//       error: error.message,
//     });
//   }
// }





import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function GET(req: NextRequest) {
  try {
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


    const emailHtml = render(
      VerificationEmail({
        username: "Rahul Pal",
        userid: "123456",
      })
    );

    // ✅ Email Options
    const mailOptions = {
      from: `"Daily Report 👨‍💻" <${process.env.EMAIL_USER}>`,
      to: "dailyreport.ahh@gmail.com",
      subject: "Test Email",
      text: "Hello Rahul, yeh ek real email hai!",
      html: "<b>Hello Rahul, yeh ek real email hai!</b>",
    };

    // ✅ Email Send karo (await lagao)
    const info = await transporter.sendMail(mailOptions);

    // ✅ Success Response
    return NextResponse.json({
      success: true,
      message: "Email sent successfully!",
      messageId: info.messageId,
    });
  } catch (error:any) {
    return NextResponse.json({
      success: false,
      error: error.message, // ❌ Error response
    });
  }
}
