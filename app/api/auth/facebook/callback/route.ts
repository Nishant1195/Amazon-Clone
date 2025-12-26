import { connect } from "@/lib/db";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    /* 1️⃣ Exchange code → access token */
    const tokenRes = await fetch(
      `https://graph.facebook.com/v18.0/oauth/access_token?` +
        new URLSearchParams({
          client_id: process.env.FACEBOOK_CLIENT_ID!,
          client_secret: process.env.FACEBOOK_CLIENT_SECRET!,
          redirect_uri: process.env.FACEBOOK_REDIRECT_URI!,
          code,
        })
    );

    const tokenData = await tokenRes.json();

    if (!tokenData.access_token) {
      throw new Error("Failed to get Facebook access token");
    }

    /* 2️⃣ Fetch user profile */
    const profileRes = await fetch(
      `https://graph.facebook.com/me?fields=id,name,email&access_token=${tokenData.access_token}`
    );

    const profile = await profileRes.json();

    if (!profile.email) {
      throw new Error("Facebook account has no email");
    }

    /* 3️⃣ Find or create user */
    await connect();

    let user = await User.findOne({ email: profile.email });

    if (!user) {
      user = await User.create({
        username: profile.name,
        email: profile.email,
        provider: "facebook",
        providerId: profile.id,
      });
    }

    /* 4️⃣ Create session token */
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    /* 5️⃣ Set cookie + redirect */
    const response = NextResponse.redirect(new URL("/", req.url));

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return response;
  } catch (err) {
    console.error("Facebook OAuth error:", err);

    return NextResponse.redirect(
      new URL("/login?error=facebook", req.url)
    );
  }
}
