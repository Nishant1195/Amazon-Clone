"use client";

import { useEffect, useState } from "react";
import { getCart } from "@/lib/cart";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cartData = getCart();
    if (cartData.length === 0) {
      router.push("/cart");
      return;
    }
    setCart(cartData);
  }, [router]);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePayment = async () => {
    try {
      setLoading(true);

      /* 1️⃣ CREATE RAZORPAY ORDER (YOUR BACKEND) */
const res = await fetch("/api/payment/order", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    amount: total * 100, // paise
    cart: cart,
  }),
});

if (!res.ok) {
  const err = await res.json();
  throw new Error(err.error || "Failed to create Razorpay order");
}





      const orderData = await res.json();

      /* 2️⃣ ENSURE RAZORPAY IS LOADED */
      if (!window.Razorpay) {
        throw new Error("Razorpay SDK not loaded");
      }

      /* 3️⃣ OPEN RAZORPAY CHECKOUT */
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: orderData.amount,
        currency: "INR",
        order_id: orderData.id, // ⚠️ must match backend response
        name: "Amazon Clone",
        description: "Order Payment",

        handler: async function (response: any) {
          /* 4️⃣ VERIFY PAYMENT + CREATE ORDER */
          const verifyRes = await fetch("/api/orders/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              items: cart,
              total,
            }),
          });

          if (!verifyRes.ok) {
            alert("Payment verification failed");
            return;
          }

          /* 5️⃣ CLEAR CART */
          localStorage.removeItem("cart");
          window.dispatchEvent(new Event("cartUpdated"));

          router.push("/orders");
        },

        theme: {
          color: "#FBBF24",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto p-6 bg-white mt-6">
      <h1 className="text-xl font-semibold mb-6">Checkout</h1>

      {cart.map(item => (
        <div key={item.productId} className="flex justify-between py-3 border-b">
          <span>
            {item.title} × {item.quantity}
          </span>
          <span>₹{item.price * item.quantity}</span>
        </div>
      ))}

      <div className="text-right mt-6">
        <p className="text-lg font-bold">Total: ₹{total}</p>

        <button
          onClick={handlePayment}
          disabled={loading}
          className="mt-4 bg-yellow-400 hover:bg-yellow-500 px-6 py-2 rounded font-semibold disabled:opacity-50"
        >
          {loading ? "Processing..." : "Pay with Razorpay"}
        </button>
      </div>
    </main>
  );
}
