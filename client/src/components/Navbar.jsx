import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    window.location.href = "/";
  };

  return (
    <div className="flex justify-between items-center p-4 shadow-xl bg-gray-900">
      <div>
        <h3
          onClick={() => navigate("/dashboard")}
          className="text-white font-semibold text-2xl cursor-pointer"
        >
          <span className="text-cyan-500 text-3xl">E</span>m
          <span className="text-cyan-500 text-3xl">M</span>anage
        </h3>
      </div>

      <button
        onClick={handleLogout}
        className="cursor-pointer px-4 py-2 bg-red-500 text-white font-semibold rounded text-base"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;