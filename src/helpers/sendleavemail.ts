import { resend } from "@/lib/resend";
import VerificationEmail from "../../email/Sendverifycation";

export interface Apires {
  userName: string;
 
  success: boolean;
  message: string;
}
export async function sendVerificationEmial(
  userName: string,
  userid:string
) {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "dailyreport.aah@gmail.com",
      subject: "Please verify your code",
      react: VerificationEmail({ username: userName,userid}),
    });
    // console.log(userName,userEmail,verifyCode)
    return {
      success: true,
      message: "Verification email send successsfully",
    };
  } catch (emailEroro) {
    console.log("Eror sending verification email", emailEroro);
    return {
      success: false,
      message: "Failed to send verification email",
    };
  }
}
