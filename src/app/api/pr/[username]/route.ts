import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: { username: string } }) {
  try {
    // Ensure username is a valid string
    const username = params.username;

    if (!username) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid username parameter.",
        },
        { status: 400 }
      );
    }

    const decodedUsername = decodeURIComponent(username);

    const res = await prisma.user.findFirst({
      where: {
        id: decodedUsername,
      },
      select: {
        dipartment: true,
        displayname: true,
        Uplodthing: {
          where: {
            userId: decodedUsername,
          },
          select: {
            YourPhoto: true,
          },
        },
      },
    });

    return NextResponse.json(res);
  } catch (error) {
    console.error("Error handling POST request:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error.",
      },
      { status: 500 }
    );
  }
}
