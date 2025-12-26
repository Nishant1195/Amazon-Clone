import {connect} from '@/lib/db';
import User from '@/models/User';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const {searchParams} = new URL(req.url);
    const code = searchParams.get("code");

    if(!code){
        return NextResponse.redirect("/login");
    }

    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
        method:"POST",
        headers:{"Content-Type":"application/x-www-form-urlencoder"},
        body: new URLSearchParams({
            code,
            client_id: process.env.GOOGLE_CLIENT_ID!,
            client_secret:process.env.GOOGLE_CLIENT_SECRET!,
            redirect_uri:process.env.GOOGLE_REDIRECT_URI!,
            grant_type:"authorization_code",
        }),

    });

    const tokenData = await tokenRes.json();

    const profileRes = await fetch(
        "https://www.googleapis.com/oauth2/v2/userinfo",
        {
            headers:{
                Authorization:`Bearer ${tokenData.access_token}`,
            },
        }
    );

    const profile = await profileRes.json();

    await connect();

    let user = await User.findOne({email:profile.email});

    if(!user){
        user = await User.create({
            username:profile.name,
            email:profile.email,
            provider:"google",
            providerId:profile.id,
        });
    }

    const token = jwt.sign(
        {userId:user._id},
        process.env.JWT_SECRET!,
        {expiresIn:"7d"}
    );

    const response = NextResponse.redirect("/");
    response.cookies.set("token", token, {
        httpOnly: true,
        secure:false,
        sameSite:"lax",
        path:"/"
    })

    return response;
}