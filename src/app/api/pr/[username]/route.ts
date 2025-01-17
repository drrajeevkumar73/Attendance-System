import prisma from "@/lib/prisma";
import { Params } from "next/dist/server/request/params";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Params },
) {
  try {
    const { username }: any = params;
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
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error.",
      },
      { status: 500 },
    );
  }
}
