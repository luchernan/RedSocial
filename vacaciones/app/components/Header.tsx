import React, { useState, useEffect } from "react";
import { Link, useMatch, useNavigate } from "react-router";
import DestinoSearchBar from "./DestinoSearchBar";
import HeaderUsuario from "./HeaderUsuario";
import Logout from "./Logout";
import { obtenerUsuarioLogueado } from "../services/api";

function Header() {
  const [tieneSesion, setTieneSesion] = useState<boolean>(false);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const navigate = useNavigate();
  const match = useMatch("/destinodetalle/:destinoId");


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

  return (
    <div className="bg-gradient-to-r from-blue-800 to-amber-900 px-4 py-5">
      <div className="flex items-center justify-between">
        <Link to="/inicio">
          <h1 className="text-4xl font-rounded-black font-black text-white transform hover:scale-105">
            PalTrip
          </h1>
        </Link>

     
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

      
        <div className="hidden md:flex items-center gap-4">
          {match && <DestinoSearchBar />}
          {tieneSesion && (
            <button
              onClick={() => navigate("/misviajes")}
              className="text-white hover:underline focus:outline-none"
            >
              Mis Viajes
            </button>
          )}
          <button
            onClick={() => navigate("/contacto")}
            className="text-white hover:underline focus:outline-none"
          >
            Contacto
          </button>
          <button
              onClick={() => navigate("/alldestinos")}
              className="text-white hover:underline focus:outline-none text-left"
            >
              Todos los Destinos
            </button>
          <HeaderUsuario />
          <Logout />
        </div>
      </div>

     
      {menuAbierto && (
      <div className="mt-4 flex flex-col items-center justify-center gap-4 md:hidden w-full px-4">
      {match && (
        <div className="w-full max-w-xs">
          <DestinoSearchBar />
        </div>
      )}
      
      {tieneSesion && (
        <button
          onClick={() => navigate("/misviajes")}
          className="text-white hover:underline focus:outline-none text-center w-full max-w-xs py-2 hover:bg-white/10 rounded transition-colors"
        >
          Mis Viajes
        </button>
      )}
      
      <button
        onClick={() => navigate("/alldestinos")}
        className="text-white hover:underline focus:outline-none text-center w-full max-w-xs py-2 hover:bg-white/10 rounded transition-colors"
      >
        Todos los Destinos
      </button>
      
      <button
        onClick={() => navigate("/contacto")}
        className="text-white hover:underline focus:outline-none text-center w-full max-w-xs py-2 hover:bg-white/10 rounded transition-colors"
      >
        Contacto
      </button>
      
      <div className="w-full max-w-xs flex justify-center mt-2">
        <HeaderUsuario />
      </div>
      
      <div className="w-full max-w-xs flex justify-center">
        <Logout />
      </div>
    </div>
      )}
    </div>
  );
}

export default Header;
