import crypto from "crypto";

export async function POST(req:Request){
    const {razorpay_order_id, razorpay_payment_id, razorpay_signature,} = await req.json();

    if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature){
        return Response.json(
            {error:"Missing payment details"},
            {status: 400}
        );
    }

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!).update(body).digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if(!isAuthentic){
        return Response.json(
            {error:"Payment verification failed"},
            {status:400}
        );
    }

    return Response.json({
        sucess:true,
        paymentId: razorpay_payment_id,
    })
}