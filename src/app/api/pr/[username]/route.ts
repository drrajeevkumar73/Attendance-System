import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface Context {
  params: {
    username: string;
  };
}

export async function POST(request: NextRequest, context: Context) {
  try {
    const { username } = context.params;

    // Validate the username parameter
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
    console.error("Error during POST request:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error.",
      },
      { status: 500 }
    );
  }
}
