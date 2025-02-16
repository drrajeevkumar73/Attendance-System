import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId, depsing, drrajeevsign, hrsign } = await req.json();

    if (!userId) {
      return NextResponse.json({ success: false, message: "User ID required" }, { status: 400 });
    }

    // 🔍 Sabse latest record fetch karo
    const latestLeaveForm = await prisma.leavform.findFirst({
      where: { userId },
      orderBy: { createdAt: "desc" }, // ✅ Latest entry find karne ke liye
    });

    if (!latestLeaveForm) {
      return NextResponse.json({ success: false, message: "No record found" }, { status: 404 });
    }

    // 📌 Sirf valid fields ko filter karo (jo null, undefined, empty string nahi hain)
    const updatedData: any = {};
    if (depsing && depsing.trim() !== "") updatedData.depsing = depsing;
    if (drrajeevsign && drrajeevsign.trim() !== "") updatedData.drrajeevsign = drrajeevsign;
    if (hrsign && hrsign.trim() !== "") updatedData.hrsign = hrsign;

    if (Object.keys(updatedData).length === 0) {
      return NextResponse.json({ success: false, message: "No valid data to update" }, { status: 400 });
    }

    // ✅ Update latest entry with dynamic data
    const updatedLeaveForm = await prisma.leavform.update({
      where: { id: latestLeaveForm.id }, // Latest entry ka `id`
      data: updatedData, // ✅ Sirf valid requested fields update
    });

    return NextResponse.json({ success: true, data: updatedLeaveForm });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
