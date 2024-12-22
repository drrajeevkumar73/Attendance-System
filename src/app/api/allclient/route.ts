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
      RANCHI: <any[]>[],
      RANCHI_SHOP: <any[]>[],
      PATNA: <any[]>[],
      KOLKATA: <any[]>[],
      GAUR_CITY: <any[]>[],
      SPECTRUM: <any[]>[],
      JAGTAULI: <any[]>[],
    };

    userData.map((v, i) => {
      if (v.city === "RANCHI") {
        value.RANCHI.push(v);
      } else if (v.city === "RANCHI SHOP") {
        value.RANCHI_SHOP.push(v);
      } else if (v.city === "PATNA") {
        value.PATNA.push(v);
      } else if (v.city === "KOLKATA") {
        value.KOLKATA.push(v);
      }else if (v.city === "GAUR CITY") {
        value.GAUR_CITY.push(v);
      }else if (v.city === "SPECTRUM") {
        value.SPECTRUM.push(v);
      }else if (v.city === "JAGTAULI") {
        value.JAGTAULI.push(v);
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
