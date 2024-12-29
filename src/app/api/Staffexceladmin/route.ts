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
    const usename=await prisma.user.findFirst({
        where:{
            id:userid
        },
        select:{
            dipartment:true,
            displayname:true
        }
    })
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
        name:usename?.displayname,
        deipartment:usename?.dipartment,
        dipartment:"telecaller",
        data:d
    })


    
   }else if(userdata.dipartment === "RECEPTIONS"){
    const usename=await prisma.user.findFirst({
        where:{
            id:userid
        },
        select:{
            dipartment:true,
            displayname:true
        }
    })
    const data=await prisma.reception.findMany({
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
        name:usename?.displayname,
        deipartment:usename?.dipartment,
        dipartment:"reception",
        data:d
    })
   }else if(userdata.dipartment === "MEDICINE COUNTER"){
    const usename=await prisma.user.findFirst({
        where:{
            id:userid
        },
        select:{
            dipartment:true,
            displayname:true
        }
    })
    const data=await prisma.medicene.findMany({
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
        name:usename?.displayname,
        deipartment:usename?.dipartment,
        dipartment:"medicen",
        data:d
    })
   }
   else if(userdata.dipartment === "SHOP RANCHI"){
    const usename=await prisma.user.findFirst({
        where:{
            id:userid
        },
        select:{
            dipartment:true,
            displayname:true
        }
    })
    const data=await prisma.ranchishop.findMany({
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
        name:usename?.displayname,
        deipartment:usename?.dipartment,
        dipartment:"ranchi_shop",
        data:d
    })
   }
   else if(userdata.dipartment === "DOCTOR"){
    const usename=await prisma.user.findFirst({
        where:{
            id:userid
        },
        select:{
            dipartment:true,
            displayname:true
        }
    })
    const data=await prisma.offlinedoctorshop.findMany({
        where:{
            userId:userid
        },
        orderBy:{
            createdAt:"desc"
        }
        
    })
    const dataone=await prisma.onlinedoctorshop.findMany({
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
    const done = dataone.filter((v: any) => {
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
        name:usename?.displayname,
        deipartment:usename?.dipartment,
        dipartment:"Doctor",
        data:[{name:"offline or online"}],
        dataOff:d,
        dataOn:done
    })
   }
   else if(userdata.dipartment === "HD / OD"){
    const usename=await prisma.user.findFirst({
        where:{
            id:userid
        },
        select:{
            dipartment:true,
            displayname:true
        }
    })
    const data=await prisma.hdod.findMany({
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
        name:usename?.displayname,
        deipartment:usename?.dipartment,
        dipartment:"hdod",
        data:d
    })
   }
   else if(userdata.dipartment === "ECART"){
    const usename=await prisma.user.findFirst({
        where:{
            id:userid
        },
        select:{
            dipartment:true,
            displayname:true
        }
    })
    const data=await prisma.ecart.findMany({
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
        name:usename?.displayname,
        deipartment:usename?.dipartment,
        dipartment:"ecart",
        data:d
    })
   }
   else if(userdata.dipartment === "DESIGNER"){
    const usename=await prisma.user.findFirst({
        where:{
            id:userid
        },
        select:{
            dipartment:true,
            displayname:true
        }
    })
    const data=await prisma.designer.findMany({
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
        name:usename?.displayname,
        deipartment:usename?.dipartment,
        dipartment:"designer",
        data:d
    })
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
