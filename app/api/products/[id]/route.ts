import { NextRequest } from "next/server";
import {connect} from "@/lib/db";
import Product from "@/models/Product";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  await connect();

  const product = await Product.findById(id);

  if (!product) {
    return new Response(
      JSON.stringify({ error: "Product not found" }),
      { status: 404 }
    );
  }

  return Response.json({ product });
}
