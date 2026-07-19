import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Clicked Login");
    
    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });
      console.log(email,password);
      
      localStorage.setItem("token", res.data.token);
      toast.success("Admin Login Successfull")
      navigate("/dashboard");
    } catch (error) {
      toast.error("Invalid Credentials");
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <form
        className="
        w-full 
        max-w-sm 
        bg-gray-300
        p-6 sm:p-8 
        rounded-lg 
        shadow-md 
        flex flex-col 
        gap-5
        border border-blue-300
      "
        onSubmit={handleLogin}
      >
        <h2 className="text-2xl sm:text-3xl text-blue-500 font-bold text-center">
          Login
        </h2>

        <input
          className="border bg-white border-blue-200 w-full py-3 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          type="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          className="border bg-white border-blue-200 w-full py-3 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          type="password"
          placeholder="Enter your password"
          required
            value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button className="py-3 bg-blue-500 hover:bg-blue-600 text-white w-full rounded font-medium transition duration-200 cursor-pointer">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
