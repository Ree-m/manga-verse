import { NextRequest, NextResponse } from "next/server";



export async function GET(){
    try{
        return NextResponse.json("OK")

    }catch(error){
        return NextResponse.json(`Health check error" ${error}`)
    }
  }
  