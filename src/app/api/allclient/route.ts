import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  
  try {
    const userData = await prisma.user.findMany({
      select: {
        id:true,
        displayname: true,
        dipartment:true
      },
    });

    return NextResponse.json(userData)
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json(
      {
        error:error,
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
}
