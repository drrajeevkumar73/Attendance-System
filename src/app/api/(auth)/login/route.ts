import { lucia } from "@/auth";
import prisma from "@/lib/prisma";
import { loginSchema } from "@/lib/vallidation";
import { verify } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, passwordHash } = await req.json();
    const data = loginSchema.parse({ email, passwordHash });

    const existemail = await prisma.user.findFirst({
      where: {
        email: {
          equals: data.email,
          mode: "insensitive",
        },
      },
    });

    if (!existemail || !existemail.passwordHash) {
      return NextResponse.json(
        {
          success: false,
          message: "Incorrect username or password",
        },
        { status: 404 },
      );
    }

    const validPassword = await verify(existemail.passwordHash, passwordHash, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    if (!validPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Incorrect username or password",
        },
        { status: 404 },
      );
    }

    const session = await lucia.createSession(existemail.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    (await cookies()).set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return NextResponse.json(
      {
        success: true,
        message: "User register successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json(
      {
        succes: false,
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
}
