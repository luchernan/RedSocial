import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { logout, obtenerUsuarioLogueado } from "../services/api";


const Logout: React.FC = () => {
  const navigate = useNavigate();
  const [tieneSesion, setTieneSesion] = useState<boolean>(true);

  useEffect(() => {
    async function checkSession() {
      try {
        await obtenerUsuarioLogueado();
        setTieneSesion(true);
      } catch {
        setTieneSesion(false);
      }
    }
    checkSession();
  }, []);

  const handleClick = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    } finally {
      navigate("/");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center space-x-1.5 px-4 py-2 rounded-full text-sm font-medium text-white bg-gradient-to-br from-amber-400 to-amber-600 hover:from-blue-400 hover:to-blue-600 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-red-200 focus:ring-offset-2"
    >
      {tieneSesion ? (

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
      ) : (<span></span>
      )}
      <span>{tieneSesion ? "Salir" : "Iniciar sesión"}</span>
    </button>
  );
};

export default Logout;
