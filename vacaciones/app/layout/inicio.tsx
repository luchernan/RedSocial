
import ListaViajes from "~/components/ListaViajes";
import HeaderUsuario from "~/components/HeaderUsuario";
import Logout from "~/components/Logout";
import React, { useState, useEffect } from "react";
import DestinoCard from "../components/DestinoCard";
import { getDestinoById, obtenerUsuarioLogueado } from "../services/api";
import { useLoaderData, useOutletContext } from "react-router";
import { useNavigate } from "react-router";
import type { Destino, Viaje } from "../interfaces/tipos";
import CrearViaje from "~/components/CrearViaje";
import DestinoSearchBar from "~/components/DestinoSearchBar";
import FiltroViajesPorUsuario from "~/components/FiltroViajesPorUsuario";
import bg from '../media/fondo2.jpg';
import { Link, Navigate } from "react-router";

function Inicio() {
  const [destinoSeleccionado, setDestinoSeleccionado] = useState<Destino | null>(null);
  const [viajesDestino, setViajesDestino] = useState<Viaje[]>([]);
  const [tieneSesion, setTieneSesion] = useState<boolean>(false);
  const [aleatorios, setAleatorios] = useState<Destino[]>([]);
  const navigate = useNavigate();
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

  useEffect(() => {
    const ids = new Set<number>();
    while (ids.size < 3) {
      ids.add(Math.floor(Math.random() * 92) + 1);
    }


    Promise.all(Array.from(ids).map((id) => getDestinoById(id)))
      .then(setAleatorios)
      .catch(console.error);
  }, []);

  return (
    <div className=" bg-gradient-to-r from-blue-300 to-amber-200">
      <div
        className="bg-cover bg-center bg-no-repeat h-170"
        style={{ backgroundImage: `url(${bg})` }}
      >

        <div className="flex items-center justify-between px-15 py-5">
          <Link to="/inicio">
            <h1 className="text-4xl transform hover:scale-105 font-rounded-black font-black text-gray-900">
              PalTrip
            </h1>
          </Link>
          <div className="flex items-center gap-4">
        
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

            <HeaderUsuario />
            <Logout />
          </div>
        </div>


        <h1 className="text-center mt-15 mb-10 text-6xl font-rounded-black font-black text-white-900">
          ¿En qué ciudad quieres <br /> encontrar nuevos amigos?
        </h1>
        <DestinoSearchBar onDestinoSeleccionado={setDestinoSeleccionado} />

        {destinoSeleccionado && (
          <>
            <ListaViajes destino={destinoSeleccionado} onViajesCargados={setViajesDestino} />
            <CrearViaje destino={destinoSeleccionado} />
          </>
        )}
      </div>


      <section className="container mx-auto px-4 py-16 md:py-20 lg:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            ¿No sabes a dónde ir?
            <span className="block w-16 h-1 bg-amber-500 mx-auto mt-4"></span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Descubre destinos increíbles seleccionados especialmente para ti
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {aleatorios.map((dest) => (
            <div
              key={dest.id}
              className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <DestinoCard
                destino={dest}

              />
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => {
              const randomId = Math.floor(Math.random() * 92) + 1;
              navigate(`/destinodetalle/${randomId}`);
            }}
            className="px-8 py-3 bg-gradient-to-r from-amber-400 to-amber-600 text-white font-semibold rounded-full shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:from-amber-500 hover:to-amber-700 active:scale-95 active:shadow-inner"
          >
            <span className="flex items-center justify-center">
              Sorpréndeme
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                />
              </svg>
            </span>
          </button>

        </div>
      </section>


    </div>
  );
}

export default Inicio;