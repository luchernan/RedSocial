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
      className="bg-red-500 text-white px-4 py-2 rounded"
    >
      Cerrar sesión
    </button>
  );
};

export default Logout;
