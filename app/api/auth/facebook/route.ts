export const runtime = "nodejs";

export async function GET() {
  return new Response(
    JSON.stringify({
      id: process.env.FACEBOOK_CLIENT_ID,
      redirect: process.env.FACEBOOK_REDIRECT_URI,
    }),
    { headers: { "Content-Type": "application/json" } }
  );
}
