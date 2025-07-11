import React, { useState } from 'react';
import { getAuth, signOut } from "firebase/auth";

export default function Navbar() {
        
    const handleLogout = async () => {
    const auth = getAuth();
    try {
        await signOut(auth);
        console.log("Signed out");
    } catch (err) {
        console.error("Logout error:", err);
    }
    };


return (
    <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-white text-2xl">Stride Dashboard</h1>
            <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
                Logout
            </button>
        </div>
    </nav>
);  
}