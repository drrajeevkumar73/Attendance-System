import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const {user}=await validateRequest();

    if(!user){
        throw Error("unauthorized")
    }

    const res=await prisma.uploder.findFirst({
        where:{
            userId:user.id
        },
        
    })

    return NextResponse.json(res)
}