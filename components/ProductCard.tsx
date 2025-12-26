'use client';

import { addToCart } from "@/lib/cart";
import Image from "next/image";
import toast from "react-hot-toast";

type Product = {
  _id: string;
  title: string;
  price: number;
  image: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart(product);

    toast.success("Added to cart 🛒", {
      duration: 2000,
    });
  };

  return (
    <article className="bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 flex flex-col h-full">
      
      {/* Image */}
      <div className="relative h-64 w-full bg-gray-50 overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          priority={false}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col grow">
        <h2 className="text-base font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {product.title}
        </h2>

        <div className="grow" />

        {/* Price + Button */}
        <div className="mt-auto space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-gray-900">
              ₹{product.price.toLocaleString("en-IN")}
            </p>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded text-sm font-semibold transition-colors duration-200 shadow-sm hover:shadow"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="h-1 bg-gradient-to-r from-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
    </article>
  );
}
