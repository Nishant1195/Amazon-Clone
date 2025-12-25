'use client'
import Link from "next/link";
import { useAuth } from "@/lib/useAuth";
import { getCart } from "@/lib/cart";
import { useEffect,useState } from "react";


export default function Header(){
    const {user, loading, logout} = useAuth();
    const [cartCount, setCartCount] = useState(0);

 useEffect(() => {
    const updateCartCount = () => {
      setCartCount(getCart().reduce((sum: any, item: { quantity: any; }) => sum + item.quantity, 0));
    };

    // Initial load
    updateCartCount();

    // Listen for cart updates
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

    return(
        <header className="w-full shadow-md">
            <nav className="flex items-center justify-between bg-gray-900 text-white px-6 py-2 h-16 gap-6">
                <Link href="/" className="font-bold text-xl px-3 py-2 hover:border hover:border-white rounded transition-all">
                Amazon
                </Link>

                <div className="flex flex-1 max-w-3xl h-11 shadow-sm">
                    <select className="bg-gray-100 text-black text-sm px-3 rounded-l border-none focus:outline-none focus:ring-2 focus:ring-yellow-400 cursor-pointer">
                        <option>All</option>
                    </select>
                    <input 
                        type="text" 
                        className="flex-1 px-4 bg-white text-black text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400" 
                        placeholder="Search Amazon"
                    />
                    <button className="bg-yellow-400 hover:bg-yellow-500 px-5 rounded-r text-black transition-colors">
                        🔍
                    </button>
                </div>

                <div className="flex items-center gap-6 text-xs">
                    <Link href="/login" className="hover:border hover:border-white rounded px-2 py-1 cursor-pointer transition-all">
                        <p className="text-gray-300">Hello, sign in</p>
                        <p className="font-bold text-sm">Account & Lists</p>
                    </Link>
                    <Link href="/orders" className="hover:border hover:border-white rounded px-2 py-1 transition-all">
                        <p className="text-gray-300">Returns</p>
                        <p className="font-bold text-sm">& Orders</p>
                    </Link>

                    <Link href="/cart" className="relative flex items-center gap-2 font-bold text-sm hover:border hover:border-white rounded px-3 py-1 transition-all">
                        <span className="text-lg">🛒</span> 
                        <span>Cart</span>
                        {cartCount > 0 && (
                            <span className="absolute -top-1 left-3 bg-yellow-400 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                </div>
            </nav>

            <div className="bg-gray-800 h-10 flex items-center px-6 text-sm gap-6 text-white">
                <span className="font-bold hover:border hover:border-white rounded px-2 py-1 cursor-pointer transition-all">☰ All</span>
                <span className="hover:border hover:border-white rounded px-2 py-1 cursor-pointer transition-all">Today's Deals</span>
                <span className="hover:border hover:border-white rounded px-2 py-1 cursor-pointer transition-all">Customer Service</span>
            </div>
        </header>
    );
}