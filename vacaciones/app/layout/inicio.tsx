
import ListaViajes from "~/components/ListaViajes";
import HeaderUsuario from "~/components/HeaderUsuario";
import Logout from "~/components/Logout";
import React, { useState } from "react";
import { useLoaderData, useOutletContext } from "react-router";
import { useNavigate } from "react-router";
import type { Destino, Viaje } from "../interfaces/tipos";
import CrearViaje from "~/components/CrearViaje";
import DestinoSearchBar from "~/components/DestinoSearchBar";
import FiltroViajesPorUsuario from "~/components/FiltroViajesPorUsuario"; // Asegúrate de importar
import bg from '../media/fondo2.jpg';
import { Link } from "react-router";


const Inicio = () => {
  const [destinoSeleccionado, setDestinoSeleccionado] = useState<Destino | null>(null);
  const [viajesDestino, setViajesDestino] = useState<Viaje[]>([]);

  return (
    <div>
      <div
        className="bg-cover bg-center bg-no-repeat h-[600px]"
        style={{ backgroundImage: `url(${bg})` }}
      >

        <div className="flex items-center justify-between px-4 py-3  ">
          <Link to="/inicio" >
            <h1 className="text-3xl font-rounded-black font-black text-gray-900">
              KissTrip
            </h1>
          </Link>

          <div className="flex items-center gap-4">
            <HeaderUsuario />
            <Logout />
          </div>
        </div>


        <h1 className="text-center mt-15 mb-10 text-5xl font-rounded-black font-black text-white-900" >
          ¿En qué ciudad quieres <br /> encontrar el Amor?
        </h1>

        <DestinoSearchBar onDestinoSeleccionado={setDestinoSeleccionado} />


        {destinoSeleccionado && (
          <>
            <FiltroViajesPorUsuario viajes={viajesDestino} />
            <ListaViajes destino={destinoSeleccionado} onViajesCargados={setViajesDestino} />
            <CrearViaje destino={destinoSeleccionado} />
          </>
        )}
      </div>


    </div>
  );
};

export default Inicio;

