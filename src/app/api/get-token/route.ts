import { validateRequest } from "@/auth";
import streamServerClient from "@/lib/strem";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { user } = await validateRequest();
    console.log("Calling get-token for user:", user?.id);
    if (!user) throw new Error(" Unauthorized");

    const expirationTime = Math.floor(Date.now() / 1000) + 60 * 60;

    const issuedAt = Math.floor(Date.now() / 1000) - 60;

    const token = streamServerClient.createToken(
      user.id,
      expirationTime,
      issuedAt,
    );

    return NextResponse.json({token});
  } catch (error) {
    return NextResponse.json(
      {
        status: false,
        message: " Error",
      },
      { status: 500 },
    );
  }
}
