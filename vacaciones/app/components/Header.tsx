import React, { useState, useEffect } from "react";
import { Link, useMatch, useNavigate } from "react-router";
import DestinoSearchBar from "./DestinoSearchBar";
import HeaderUsuario from "./HeaderUsuario";
import Logout from "./Logout";
import { obtenerUsuarioLogueado } from "../services/api";

function Header() {
  const [tieneSesion, setTieneSesion] = useState<boolean>(false);
  const navigate = useNavigate();
  const match = useMatch("/destinodetalle/:destinoId");

  // Comprobar sesión al montar
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
    <div className="flex items-center justify-between px-15 py-5">
      <div className="flex items-center gap-6">
        <Link to="/inicio">
          <h1 className="text-4xl font-rounded-black font-black text-white-900 transform hover:scale-105">
            PalTrip
          </h1>
        </Link>

       
      </div>

      {match && <DestinoSearchBar />}

      <div className="flex items-center gap-4">
      {tieneSesion && (
          <button
            onClick={() => navigate("/misviajes")}
            className="text-white hover:underline focus:outline-none"
          >
            Mis Viajes
          </button>
        )}
        <HeaderUsuario />
        <Logout />
      </div>
    </div>
  );
}

export default Header;
