import React from "react";
import { useNavigate } from "react-router";
import { logout } from "../services/api";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <button
    onClick={handleLogout}
    className="flex items-center space-x-1.5 px-4 py-2 rounded-full text-sm font-medium text-black bg-gradient-to-br from-amber-400 to-blue-600 hover:from-red-100 hover:to-red-100 shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-200 focus:ring-offset-2"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
    <span>Salir</span>
  </button>
  );
};

export default Logout;
