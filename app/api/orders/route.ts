import {connect} from "@/lib/db";
import Product from "@/models/Product";
import Order from "@/models/Order";
import  jwt  from "jsonwebtoken";
import {cookies} from "next/headers";
import { error } from "console";

export async function POST(req:Request){
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if(!token){
        return Response.json(
            {error:"Unauthorized"},
            {status:401}
        );
    }

    

    let userId: string;

    try{
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
        userId = decoded.userId;
    }catch {
        return Response.json(
            {error:"Invalid token"},
            {status:401}
        );
    }

    const {cart, paymentId} = await req.json();

    if(!cart || cart.length === 0 || !paymentId){
        return Response.json(
            {error:"Invalid order data"},
            {status: 400}
        );
    }



    await connect();

    let totalAmount = 0;
    const orderItems = [];

    for(const item of cart){
        const product = await Product.findById(item.productId);

        if(!product){
            return Response.json(
                {error:"Product not found"},
                {status:400}
            );

        }

        if(product.stock < item.quantity){
            return Response.json(
                {error:`Insufficient stock for ${product.title}`},
                {status: 400}
            );
        }

        product.stock -= item.quantity;
        await product.save();

        totalAmount += product.price * item.quantity;

        orderItems.push({
            productId: product._id,
            price: product.price,
            quantity: item.quantity,
        });
    }

    const order = await Order.create({
        userId,
        items:orderItems,
        totalAmount,
        paymentStatus:"PAID",
        paymentId,
    });

    return Response.json({order})
}

export async function GET(){
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if(!token){
        return Response.json(
            {error:"Unauthorized"},
            {status: 401}
        );
    }

    let userId: string;

    try{
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
        userId = decoded.userId;
    }catch{
        return Response.json(
            {error:"Invalid token"},
            {status: 401}
        );
    }

    await connect();
    const orders = await Order.find({userId}).sort({createdAt: -1}).populate("items.productId", "title image");

    return Response.json({orders});
}