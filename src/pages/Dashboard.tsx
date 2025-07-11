import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import CSVUpload from "../components/CSVUpload";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
    const { user } = useAuth();
    
    if (!user) {
        return <Navigate to="/" />;
    }
    
    return (
        <div className="container mx-auto p-4">
            <Navbar />
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p>Welcome, {user.email}!</p>
            <CSVUpload />
            {/* Add more dashboard components here */}
        </div>
    );
    }

export default Dashboard;