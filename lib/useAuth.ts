"use client";

import { useState,useEffect } from "react";

type User = {
    _id: string;
    email?: string;
    name?:string;
};

export function useAuth(){
    const[user, setUser] = useState<User | null>(null);
    const[loading, setLoading] = useState(true);

    useEffect(()=>{
        fetch("/api/users/me").then(
            res=>{
                if(!res.ok) throw new Error("Not logged in");
                return res.json();
            }
        )
        .then(data=>{
            setUser(data.user);
        })
        .catch(()=>{
            setUser(null);
        })
        .finally(()=>{
            setLoading(false);
        })
    }, []);

    const logout = async () => {
        await fetch("/api/auth/logout", {method:"POST"});
        setUser(null)
    }

    return{user, loading, logout}
}