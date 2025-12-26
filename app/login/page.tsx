"use client";

import { useEffect } from "react";



export default function LoginPage(){
    useEffect(()=>{
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/me`).then(res=>{
        if(res.ok){
            window.location.href="/";
        }
    })
}, [])
    return(
        <main className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white w-87.5 p-6 border border-gray-300 rounded">
                <div className="text-center text-gray-500 mb-6 text-2xl font-bold">
                    Amazon
                </div>

                <h1 className="text-xl font-semibold mb-4 text-gray-500">Sign in</h1>
            <button onClick={()=>{
                window.location.href=`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/google`
            }} className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded text-sm font-semibold">Sign in with Google</button>
            <p className="text-xs text-gray-600 mt-4">
          By continuing, you agree to Amazon Clone’s
          Conditions of Use and Privacy Notice.
        </p>
            </div>
        </main>
    )
}