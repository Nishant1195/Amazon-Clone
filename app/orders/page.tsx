"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type OrderItem = {
  title: string;
  price: number;
  quantity: number;
};

type Order = {
  _id: string;
  createdAt: string;
  total: number;
  items: OrderItem[];
  paymentStatus: string;
};

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/orders")
      .then(res => {
        if (res.status === 401) {
          router.push("/login");
          return null;
        }
        return res.json();
      })
      .then(data => {
        if (data?.orders) {
          setOrders(data.orders);
        }
      })
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) {
    return (
      <main className="max-w-5xl mx-auto p-6">
        <p>Loading your orders…</p>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">
        Your Orders
      </h1>

      {orders.length === 0 && (
        <p>You have not placed any orders yet.</p>
      )}

      {orders.map(order => (
        <div
          key={order._id}
          className="border rounded-lg mb-6 bg-white"
        >
          {/* ORDER HEADER */}
          <div className="bg-gray-100 px-4 py-3 flex justify-between text-sm">
            <div>
              <p className="font-semibold">
                Order #{order._id.slice(-6)}
              </p>
              <p className="text-gray-600">
                Placed on{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="text-right">
              <p className="font-semibold">
                ₹{order.total}
              </p>
              <p
                className={`text-xs font-semibold ${
                  order.paymentStatus === "paid"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {order.paymentStatus.toUpperCase()}
              </p>
            </div>
          </div>

          {/* ORDER ITEMS */}
          <div className="p-4 space-y-3">
            {order.items.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between text-sm"
              >
                <span>
                  {item.title} × {item.quantity}
                </span>
                <span>
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </main>
  );
}
