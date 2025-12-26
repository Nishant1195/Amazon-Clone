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
    /* 1️⃣ Exchange code → access token */
    const tokenRes = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: new URLSearchParams({
          client_id: process.env.GITHUB_CLIENT_ID!,
          client_secret: process.env.GITHUB_CLIENT_SECRET!,
          code,
          redirect_uri: process.env.GITHUB_REDIRECT_URI!,
        }),
      }
    );

    const tokenData = await tokenRes.json();

    if (!tokenData.access_token) {
      throw new Error("Failed to get GitHub access token");
    }

    /* 2️⃣ Fetch user profile */
    const profileRes = await fetch(
      "https://api.github.com/user",
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      }
    );

    const profile = await profileRes.json();

    /* 3️⃣ Fetch email (GitHub may not return it in /user) */
    let email = profile.email;

    if (!email) {
      const emailRes = await fetch(
        "https://api.github.com/user/emails",
        {
          headers: {
            Authorization: `Bearer ${tokenData.access_token}`,
          },
        }
      );

      const emails = await emailRes.json();
      email = emails.find((e: any) => e.primary)?.email;
    }

    if (!email) {
      throw new Error("GitHub account has no email");
    }

    /* 4️⃣ Find or create user */
    await connect();

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        username: profile.login,
        email,
        provider: "github",
        providerId: profile.id,
      });
    }

    /* 5️⃣ Create JWT */
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    /* 6️⃣ Set cookie + redirect */
    const response = NextResponse.redirect(new URL("/", req.url));

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return response;
  } catch (err) {
    console.error("GitHub OAuth error:", err);

    return NextResponse.redirect(
      new URL("/login?error=github", req.url)
    );
  }
}
