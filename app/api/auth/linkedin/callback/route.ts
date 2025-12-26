import { connect } from "@/lib/db";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    /* 1️⃣ Exchange code for access token */
    const tokenRes = await fetch(
      "https://www.linkedin.com/oauth/v2/accessToken",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code,
          redirect_uri: process.env.LINKEDIN_REDIRECT_URI!,
          client_id: process.env.LINKEDIN_CLIENT_ID!,
          client_secret: process.env.LINKEDIN_CLIENT_SECRET!,
        }),
      }
    );

    const tokenData = await tokenRes.json();

    if (!tokenData.access_token) {
      throw new Error("Failed to get LinkedIn access token");
    }

    /* 2️⃣ Fetch user info (OpenID Connect) */
    const profileRes = await fetch(
      "https://api.linkedin.com/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      }
    );

    const profile = await profileRes.json();

    if (!profile.email) {
      throw new Error("LinkedIn account has no email");
    }

    /* 3️⃣ Find or create user */
    await connect();

    let user = await User.findOne({ email: profile.email });

    if (!user) {
      user = await User.create({
        username: profile.name,
        email: profile.email,
        provider: "linkedin",
        providerId: profile.sub,
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
    console.error("LinkedIn OAuth error:", err);

    return NextResponse.redirect(
      new URL("/login?error=linkedin", req.url)
    );
  }
}
