import { connect } from "@/lib/db";
import Product from "@/models/Product";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  const { cart } = await req.json();

  if (!cart || cart.length === 0) {
    return Response.json(
      { error: "Cart is empty" },
      { status: 400 }
    );
  }

  await connect();

  let totalAmount = 0;

 
  for (const item of cart) {
    const product = await Product.findById(item.productId);

    if (!product) {
      return Response.json(
        { error: "Invalid product in cart" },
        { status: 400 }
      );
    }

    totalAmount += product.price * item.quantity;
  }

  
  const order = await razorpay.orders.create({
    amount: totalAmount * 100, 
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  });

  return Response.json({
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
  });
}
