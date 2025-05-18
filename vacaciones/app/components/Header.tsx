import React from "react";
import logo from '../media/logo.png';
import Logout from "~/components/Logout";
import DestinoSearchBar from "./DestinoSearchBar";
import HeaderUsuario from "~/components/HeaderUsuario";
import { Link, useMatch } from "react-router";

function Header() {
  // This will be non-null only when the current URL matches /destinodetalle/:destinoId
  const match = useMatch("/destinodetalle/:destinoId");

  return (
    <div className="flex items-center justify-between px-15 py-5">
      <Link to="/inicio">
        <h1 className="text-4xl font-rounded-black font-black text-white-900 transform hover:scale-105">
          PalTrip
        </h1>
      </Link>

      {/* Only render the search bar when on /destinodetalle/:destinoId */}
      {match && <DestinoSearchBar />}

      <div className="flex items-center gap-4">
        <HeaderUsuario />
        <Logout />
      </div>
    </div>
  );
}

export default Header;