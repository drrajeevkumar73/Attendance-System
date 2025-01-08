import { NextRequest } from "next/server";

export async function POST(req:NextRequest) {
    try {
        const {nearClinic}=await req.json()
        console.log(nearClinic)
    } catch (error) {
        
    }
}