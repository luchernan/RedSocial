import React from "react";
import logo from '../media/logo.png';
import Logout from "~/components/Logout";
import HeaderUsuario from "~/components/HeaderUsuario";
function Header() {
   
    return (
        <div    className="flex items-center justify-between px-6 py-4 shadow-sm border-b border-gray-100"
        style={{ backgroundColor: '#f1f0f5' }}
      >
        <div className="flex items-center">
    <img 
      src={logo} 
      alt="Logo de la aplicación" 
      className="h-10 w-auto transition-transform hover:scale-105" 
    />
 <div className="flex items-center space-x-6">




  </div>
  <Logout></Logout>
  <HeaderUsuario></HeaderUsuario>
      </div>
      </div>
    );
}

export default Header;