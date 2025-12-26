"use client";

import Link from "next/link";
import { useAuth } from "@/lib/useAuth";
import { getCart } from "@/lib/cart";
import { useEffect, useState } from "react";

export default function Header() {
  const { user, loading, logout } = useAuth();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const count = getCart().reduce(
        (sum: number, item: { quantity: number }) => sum + item.quantity,
        0
      );
      setCartCount(count);
    };

    updateCartCount();
    window.addEventListener("cartUpdated", updateCartCount);
    return () => window.removeEventListener("cartUpdated", updateCartCount);
  }, []);

  return (
    <header className="w-full shadow-md">
      {/* TOP BAR */}
      <nav className="flex items-center justify-between bg-gray-900 text-white px-3 md:px-6 h-14 md:h-16">
        
        {/* LOGO */}
        <Link
          href="/"
          className="font-bold text-lg md:text-xl px-2 py-1 hover:border hover:border-white rounded"
        >
          Amazon
        </Link>

        {/* SEARCH (DESKTOP) */}
        <div className="hidden md:flex flex-1 max-w-3xl h-11 mx-6">
          <select className="bg-gray-100 text-black text-sm px-3 rounded-l focus:outline-none">
            <option>All</option>
          </select>
          <input
            type="text"
            placeholder="Search Amazon"
            className="flex-1 px-4 bg-white text-black text-sm focus:outline-none"
          />
          <button className="bg-yellow-400 hover:bg-yellow-500 px-5 rounded-r text-black">
            🔍
          </button>
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-3 md:gap-6 text-xs">
          
          {/* ACCOUNT */}
          <Link
            href="/login"
            className="flex flex-col items-center md:block hover:border hover:border-white rounded px-2 py-1"
          >
            <span className="md:hidden text-lg">👤</span>
            <div className="hidden md:block">
              <p className="text-gray-300">
                {user ? `Hello, ${user.name}` : "Hello, sign in"}
              </p>
              <p className="font-bold text-sm">Account & Lists</p>
            </div>
          </Link>

          {/* ORDERS */}
          <Link
            href="/orders"
            className="flex flex-col items-center md:block hover:border hover:border-white rounded px-2 py-1"
          >
            <span className="md:hidden text-lg">📦</span>
            <div className="hidden md:block">
              <p className="text-gray-300">Returns</p>
              <p className="font-bold text-sm">& Orders</p>
            </div>
          </Link>

          {/* CART */}
          <Link
            href="/cart"
            className="relative flex flex-col md:flex-row items-center font-bold text-sm hover:border hover:border-white rounded px-2 py-1"
          >
            <span className="text-lg">🛒</span>
            <span className="hidden md:inline ml-1">Cart</span>

            {cartCount > 0 && (
              <span className="absolute -top-1 left-4 md:left-3 bg-yellow-400 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </nav>

      {/* SEARCH (MOBILE) */}
      <div className="flex md:hidden bg-gray-900 px-3 pb-2">
        <div className="flex w-full h-10">
          <input
            type="text"
            placeholder="Search Amazon"
            className="flex-1 px-3 bg-white text-black text-sm rounded-l focus:outline-none"
          />
          <button className="bg-yellow-400 px-4 rounded-r text-black">
            🔍
          </button>
        </div>
      </div>

      {/* SECONDARY NAV */}
      <div className="bg-gray-800 h-10 flex items-center px-3 md:px-6 text-xs md:text-sm gap-4 text-white overflow-x-auto">
        <span className="font-bold whitespace-nowrap hover:border hover:border-white rounded px-2 py-1">
          ☰ All
        </span>
        <span className="whitespace-nowrap hover:border hover:border-white rounded px-2 py-1">
          Today's Deals
        </span>
        <span className="whitespace-nowrap hover:border hover:border-white rounded px-2 py-1">
          Customer Service
        </span>
        <span className="whitespace-nowrap hover:border hover:border-white rounded px-2 py-1">
          Gift Cards
        </span>
      </div>
    </header>
  );
}
