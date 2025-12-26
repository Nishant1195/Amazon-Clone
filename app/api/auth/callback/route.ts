import { connect } from "@/lib/db";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/login`, req.url));
  }

  try {
    /* 1️⃣ Exchange authorization code for access token */
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI!, // MUST MATCH CONSOLE
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenRes.json();

    if (!tokenData.access_token) {
      throw new Error("Failed to obtain access token");
    }

    /* 2️⃣ Fetch user profile */
    const profileRes = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      }
    );

    const profile = await profileRes.json();

    if (!profile.email) {
      throw new Error("Failed to fetch user profile");
    }

    /* 3️⃣ DB: find or create user */
    await connect();

    let user = await User.findOne({ email: profile.email });

    if (!user) {
      user = await User.create({
        username: profile.name,
        email: profile.email,
        provider: "google",
        providerId: profile.id,
      });
    }

    /* 4️⃣ Create JWT */
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
    console.error("OAuth callback error:", err);

    return NextResponse.redirect(
      new URL("/login?error=oauth", req.url)
    );
  }
}
