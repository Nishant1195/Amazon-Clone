import {connect} from "@/lib/db";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import {cookies} from "next/headers";

export async function GET() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if(!token){
        return Response.json({user:null});
    }

    try{
        const decoded:any=jwt.verify(token, process.env.JWT_SECRET!);

        await connect()

        const user = await User.findById(decoded.userId).select("-__v");

        return Response.json({user})
    }catch{
        return Response.json({user: null});
    }
}