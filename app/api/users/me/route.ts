import { connect } from "@/lib/db";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  // ❌ No token → NOT authenticated
  if (!token) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    await connect();

    const user = await User.findById(decoded.userId).select("-__v");

    // ❌ Token valid but user missing
    if (!user) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // ✅ Authenticated
    return Response.json({ user });
  } catch {
    // ❌ Invalid / expired token
    return Response.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
}
