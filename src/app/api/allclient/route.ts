import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const userData = await prisma.user.findMany({
      select: {
        id: true,
        displayname: true,
        dipartment: true,
        city: true,
      },
    });

    const value = {
      Patna: <any[]>[],
      Kolkata: <any[]>[],
      Delhi: <any[]>[],
      Ranchi: <any[]>[],
    };

    userData.map((v, i) => {
      if (v.city == "Patna") {
        value.Patna.push(v);
      } else if (v.city == "Kolkata") {
        value.Kolkata.push(v);
      } else if (v.city == "Delhi") {
        value.Delhi.push(v);
      } else if (v.city == "Ranchi") {
        value.Ranchi.push(v);
      }
    });

    return NextResponse.json(value);
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json(
      {
        error: error,
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
}
