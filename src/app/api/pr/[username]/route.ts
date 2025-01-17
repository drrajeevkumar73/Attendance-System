import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, context: any) {
  try {
    const { username } = context.params;

    if (!username) {
      return NextResponse.json(
        { success: false, message: "Username parameter is missing." },
        { status: 400 }
      );
    }

    const decodedUsername = decodeURIComponent(username);

    const user = await prisma.user.findFirst({
      where: { id: decodedUsername },
      select: {
        dipartment: true,
        displayname: true,
        Uplodthing: {
          where: { userId: decodedUsername },
          select: { YourPhoto: true },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error handling POST request:", error);

    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
