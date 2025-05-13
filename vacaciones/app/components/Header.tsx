import React from "react";
import logo from '../media/logo.png';
import Logout from "~/components/Logout";
import HeaderUsuario from "~/components/HeaderUsuario";
import { Link } from "react-router";
function Header() {

  return (
    <div className="flex items-center justify-between px-15 py-5  ">
    <Link to="/inicio" >
      <h1 className="text-4xl font-rounded-black font-black text-white-900 transform hover:scale-105">
        KissTrip
      </h1>
    </Link>

    <div className="flex items-center gap-4">
      <HeaderUsuario />
      <Logout />
    </div>
  </div>
  );
}

export default Header;