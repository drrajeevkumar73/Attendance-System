import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { isWithinExpirationDate } from "oslo";

export async function GET() {
  const { user } = await validateRequest();
  if (!user) throw Error(" Unauthorized");

  const statu = await prisma.leavform.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 1,
  });
  if (!statu[0]) {
    return NextResponse.json("");
  }

  const verifyCodeExpiry = isWithinExpirationDate(statu[0].expiresAt);
  if (!verifyCodeExpiry) {
    return NextResponse.json("");
  }
  if (!statu[0].hrsign && !statu[0].depsing) {
    return NextResponse.json("Your Application is not approved by Admin 😔.");
  }
  return NextResponse.json(
    "Congratulations❤️ Your Application is approved by Admin, Now you can take leave.",
  );
}
