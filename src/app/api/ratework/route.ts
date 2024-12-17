import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { boolean } from "zod";

export async function POST(req: NextRequest) {
  try {
    const { username, monthname } = await req.json();
    const trueBoolean = monthname === "true";

    console.log("Converted Boolean Value:", trueBoolean);


    const userdaat = await prisma.user.update({
      where: {
        id: username,
      },
      data: {
        permisionToggal:trueBoolean,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Permission toggle updated successfully.",
      },
      { status: 200 },
    );
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
