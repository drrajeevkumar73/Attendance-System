import { lucia } from "@/auth";
import prisma from "@/lib/prisma";
import { signupSchema } from "@/lib/vallidation";
import { hash } from "@node-rs/argon2";
import { generateIdFromEntropySize } from "lucia";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { displayname, email, dipartment, passwordHash } = await req.json();
    const data = signupSchema.parse({
      displayname,
      email,
      dipartment,
      passwordHash,
    });
    const userId = generateIdFromEntropySize(10);
    const hashP = await hash(data.passwordHash, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    const existemail = await prisma.user.findFirst({
      where: {
        email: {
          equals: data.email,
          mode: "insensitive",
        },
      },
    });

    if (existemail) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is already exist",
        },
        { status: 400 }
      );
    }

    await prisma.user.create({
      data: {
        id: userId,
        displayname: data.displayname,
        email: data.email,
        dipartment: data.dipartment,
        passwordHash: hashP,
      },
    });
    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    (await cookies()).set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return NextResponse.json({
      success: true,
      message: "User register successfully",
    },
    { status: 200 });
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
