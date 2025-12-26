"use client";

import { useEffect } from "react";

export default function LoginPage() {
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/me`).then((res) => {
      if (res.ok) {
        window.location.href = "/";
      }
    });
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-sm p-6 border border-gray-300 rounded shadow-sm">
        
        {/* Logo */}
        <div className="text-center text-gray-500 mb-6 text-2xl font-bold">
          Amazon
        </div>

        {/* Title */}
        <h1 className="text-xl font-semibold mb-4 text-gray-700">
          Sign in
        </h1>

        {/* Google Sign-in */}
        <button
          onClick={() => {
            window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/google`;
          }}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded text-sm font-semibold transition-colors"
        >
          Sign in with Google
        </button>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="grow h-px bg-gray-300" />
          <span className="px-3 text-xs text-gray-500">OR</span>
          <div className="grow h-px bg-gray-300" />
        </div>

        {/* Facebook Sign-in */}
        <button
          onClick={() => {
            window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/facebook`;
          }}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-sm font-semibold transition-colors"
        >
          Continue with Facebook
        </button>

        {/* Terms */}
        <p className="text-xs text-gray-600 mt-4 leading-relaxed">
          By continuing, you agree to Amazon Clone’s{" "}
          <span className="text-blue-600 cursor-pointer hover:underline">
            Conditions of Use
          </span>{" "}
          and{" "}
          <span className="text-blue-600 cursor-pointer hover:underline">
            Privacy Notice
          </span>.
        </p>
      </div>
    </main>
  );
}
