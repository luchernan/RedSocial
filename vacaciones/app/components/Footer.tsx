import React from "react";

import UsuarioLogeado from "~/components/UsuarioLogueado";
function Footer() {

  return (

    <div className="  font-rounded-black ">

      <footer className=" py-3 bg-gray-950 text-sm">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <p className="text-gray-600">
            © {new Date().getFullYear()} <span className="font-medium font-rounded-black   text-gray-600">KissTrip</span>
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
              Inicio
            </a>
           
            <a href="/contacto" className="text-gray-500 hover:text-gray-700 transition-colors">
              
              Contacto
            </a>
          </div>
        </div>
      </footer>

    </div>
  )
}
export default Footer;