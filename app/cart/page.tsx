"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import {getCart, removeFromCart} from "@/lib/cart";
import { useRouter } from "next/navigation";

export default function CartPage(){
    const[cart, setCart] = useState<any[]>([]);
    const router = useRouter();

  useEffect(() => {
    const updateCart = () => {
      setCart(getCart());
    };

    // Initial load
    updateCart();

    // Listen for cart updates
    window.addEventListener("cartUpdated", updateCart);

    return () => {
      window.removeEventListener("cartUpdated", updateCart);
    };
  }, []);

    const total = cart.reduce(
        (sum, item) => sum +item.price * item.quantity, 0
    );

    return(
        <main className="max-w-4xl mx-auto p-6 bg-white mt-6">
            <h1 className="text-xl font-semibold mb-4">
                Shopping Cart
            </h1>

            {cart.length === 0 &&(
                <p>Your Amazon Card is Empty.</p>
            )}

            {cart.map(item => (
                <div key={item.productId} className="flex gap-4 border-b py-4">
                    <div className="relative h-24 w-24">
                        <Image src={item.image} alt="item.title" fill className="object-cover"/>
                    </div>

                <div className="flex-1">
                    <p className="font-semibold">{item.title}</p>
                    <p className="font-sm">Qty: {item.quantity}</p>
                    <p className="font-bold">{item.price}</p>

                    <button className="cursor-pointer " onClick={()=>{
                        removeFromCart(item.productId);
                        setCart(getCart());
                    }}>Remove</button>
                </div>
                </div>
            ))}

            {
                cart.length > 0 && (
                    <div className="text-right mt-6">
                        <p className="text-lg font-bold">
                            Subtotal:₹{total}
                        </p>
                        <button
  onClick={() => router.push("/checkout")}
  className="mt-4 bg-yellow-400 hover:bg-yellow-500 px-6 py-2 rounded font-semibold"
>
  Proceed to Checkout
</button>
                    </div>
                )
            }

        </main>
    )
}