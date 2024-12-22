import prisma from "@/lib/prisma";
import { formatRelativeMonth } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {

    const { userid,monthname,dipartment } = await req.json();

    const userdata =await prisma.user.findFirst({
        where:{
            dipartment:dipartment,
        },

    })

   if(!userdata){
    return NextResponse.json({
        success:false,
        message: "User not found",
    })
   }


   if(userdata.dipartment === "TELECALLER DEPT"){
    const data=await prisma.telecaller.findMany({
        where:{
            userId:userid
        },
        orderBy:{
            createdAt:"desc"
        }
        
    })



    const d = data.filter((v: any) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Aaj ke din ka start fix karo
    
        const createdAt = new Date(v.createdAt);
    
        if (monthname === "Today") {
            // Aaj ka data filter karo
            const tomorrow = new Date(today);
            tomorrow.setDate(today.getDate() + 1);
            return createdAt >= today && createdAt < tomorrow;
        } else if (monthname === "Yesterday") {
            // Kal ka data filter karo
            const yesterdayStart = new Date(today);
            yesterdayStart.setDate(today.getDate() - 1);
            const yesterdayEnd = new Date(today);
            return createdAt >= yesterdayStart && createdAt < yesterdayEnd;
        } else if (monthname === "last_7_day") {
            // Last 7 din ka data filter karo
            const last7DaysStart = new Date(today);
            last7DaysStart.setDate(today.getDate() - 7);
    
            const last7DaysEnd = new Date(today);
    
            return createdAt >= last7DaysStart && createdAt < last7DaysEnd;
        } else if (monthname) {
            // Specific month ka data filter karo
            return monthname === formatRelativeMonth(v.createdAt);
        }
    });
    

    return NextResponse.json({
        dipartment:"telecaller",
        data:d
    })


    
   }else if(userdata.dipartment === "HR"){
    // const data=prisma.telecaller.findMany({
    //     where:{
    //         userId:userid
    //     }
    // })

    // return NextResponse.json(data)
   }


  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
}
