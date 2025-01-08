import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { statusBar } = await req.json();

    const { user } = await validateRequest();

    if (!user) throw new Error("Unauthorized");
   await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        permisionToggal: statusBar,
      },
    });

    return NextResponse.json({ h: "status is false" });
  } catch (error) {}
}
