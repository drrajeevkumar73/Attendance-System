import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await context.params; // ✅ `await` added here
    console.log("Received userId:", userId);

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User ID is required" },
        { status: 400 }
      );
    }

    const userdata = await prisma.leavform.findMany({
      where: { userId:userId },
      orderBy: { createdAt: "desc" },
      take: 1,
    });

    return NextResponse.json(userdata);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
