import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const {user}=await validateRequest();
    if(!user){
        throw Error("unathosized")
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
      task15,
      panCard,
      aadharCard,
      DebitCard,
      YourPhoto,
    } = await req.json();
   

    const userDoc = await prisma.uploder.findFirst({
        where:{
            userId:user.id
        }
    })

    if(userDoc){
        return NextResponse.json({
            success:false,
            message:"You have already uploaded your documents"
        })
    }



    await prisma.uploder.create({
        data:{
            userId:user.id,
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
            task12: new Date(),
            task13: "",
            task14: "",
            task15: "",
            panCard:panCard[0],
            aadharCard:aadharCard[0],
            DebitCard:DebitCard[0],
            YourPhoto:YourPhoto[0],
        }
    })


    return NextResponse.json({
        success:false,
        message:" Documents uploaded successfully"
    })
  } catch (error) {}
}
