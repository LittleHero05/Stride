import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoginComp from "../components/LoginComp";

const Login = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" />;
  } 

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Login</h1>
      <LoginComp />
    </div>
  );
};
export default Login;