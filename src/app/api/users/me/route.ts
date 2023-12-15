import { getDataFromToken}  from "@/helpers/getDataFromToken";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request:NextRequest){
    console.log("i am here");
    try {
        console.log("working1");
        const userId = await getDataFromToken(request);
        console.log("working",userId);
        const user = await User.findOne({_id:userId}).select("-password");
        console.log("working3",user);
        return NextResponse.json({message:"User found",data:user});
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:400});
    }
}