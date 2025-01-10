import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { user } = await validateRequest();
    if (!user) {
      throw Error("unathosized");
    }
    const {
      task1,
      task2,
      task3,
      task4,
      task5,
      task6,
      task7,
      task8,
      task9,
      task10,
      task11,
      task12,
      task13,
      task14,

      task16,
      task17,
      task18,
      task19,
      task20,
      task21,
      task22,
      task23,
      task24,
      task25,
      task26,
      task27,
      task28,
      task29,
      task30,
      task31,
      task32,
      task34,
      task35,
      task36,
      task37,
      task38,
      task39,
      task40,
      task41,
      task42,
      task43,
      task44,
      task45,
      task46,
      task47,
      task48,
      task49,
      task50,
      panCard,
      aadharCard,
      DebitCard,
      YourPhoto,
      parentAdhar,
      ParentPancard,
    } = await req.json();

    const userDoc = await prisma.uploder.findFirst({
      where: {
        userId: user.id,
      },
    });

    if (userDoc) {
      return NextResponse.json({
        success: false,
        message: "You have already uploaded your documents",
      });
    }

    await prisma.uploder.create({
      data: {
        userId: user.id,
        task1,
        task2,
        task3,
        task4,
        task5,
        task6,
        task7,
        task8,
        task9,
        task10,
        task11,
        task12,
        task13,
        task14,

        task16,
        task17,
        task18,
        task19,
        task20,
        task21,
        task22,
        task23,
        task24,
        task25,
        task26,
        task27,
        task28,
        task29,
        task30,
        task31,
        task32,
        task34,
        task35,
        task36,
        task37,
        task38,
        task39,
        task40,
        task41,
        task42,
        task43,
        task44,
        task45,
        task46,
        task47,
        task48,
        task49,
        task50,
        panCard: panCard[0],
        aadharCard: aadharCard[0],
        DebitCard: DebitCard[0],
        YourPhoto: YourPhoto[0],
        parentAdhar: parentAdhar[0],
        ParentPancard: ParentPancard[0],
      },
    });

    return NextResponse.json({
      success: true,
      message: " Documents uploaded successfully",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: " Interval server error",
    });
  }
}
