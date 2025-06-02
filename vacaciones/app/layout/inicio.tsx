import ListaViajes from "~/components/ListaViajes";
import HeaderUsuario from "~/components/HeaderUsuario";
import Logout from "~/components/Logout";
import React, { useState, useEffect } from "react";
import DestinoCard from "../components/DestinoCard";
import {
  getDestinoById,
  obtenerUsuarioLogueado,
  getImagenPexels,
} from "../services/api";
import { useNavigate } from "react-router";
import type { Destino, Viaje } from "../interfaces/tipos";
import CrearViaje from "~/components/CrearViaje";
import DestinoSearchBar from "~/components/DestinoSearchBar";
import FiltroViajesPorUsuario from "~/components/FiltroViajesPorUsuario";
import bg from "../media/fondo2.jpg";
import { Link, Navigate } from "react-router";

function Inicio() {
  const [destinoSeleccionado, setDestinoSeleccionado] =
    useState<Destino | null>(null);
  const [viajesDestino, setViajesDestino] = useState<Viaje[]>([]);
  const [tieneSesion, setTieneSesion] = useState<boolean>(false);
  const [aleatorios, setAleatorios] = useState<Destino[]>([]);
  const [destinos, setDestinos] = useState<Destino[]>([]);
  const [imagenes, setImagenes] = useState<(string | null)[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [menuAbierto, setMenuAbierto] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarDestinos = async () => {
      try {
        const ids = [44, 18, 50];
        const destinosData = await Promise.all(
          ids.map((id) => getDestinoById(id))
        );

        const imagenesData = await Promise.all(
          destinosData.map((destino) =>
            getImagenPexels(destino.nombre).then((imagen) =>
              imagen && imagen.trim() !== "" ? imagen : null
            )
          )
        );

        setDestinos(destinosData);
        setImagenes(imagenesData);
      } catch (err) {
        setError("Error al cargar los destinos");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    cargarDestinos();
  }, []);

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
    <div className="bg-gradient-to-r from-blue-300 to-amber-200">
      <div
        className="bg-cover bg-center bg-no-repeat h-170"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="flex items-center justify-between px-5 py-5">
          <Link to="/inicio">
            <h1 className="text-4xl font-rounded-black font-black text-gray-900">
              PalTrip
            </h1>
          </Link>

          <div className="md:hidden">
            <button
              onClick={() => setMenuAbierto(!menuAbierto)}
              className="text-white"
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
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {tieneSesion && (
              <button
                onClick={() => navigate("/misviajes")}
                className="text-white hover:underline"
              >
                Mis Viajes
              </button>
            )}
            <button
              onClick={() => navigate("/contacto")}
              className="text-white hover:underline"
            >
              Contacto
            </button>
            <button
              onClick={() => navigate("/alldestinos")}
              className="text-white hover:underline"
            >
              Todos los Destinos
            </button>
            <HeaderUsuario />
            <Logout />
          </div>
        </div>

        {menuAbierto && (
     <div className="md:hidden flex flex-col items-center px-5 py-6 gap-5 bg-gradient-to-br from-blue-400 to-blue-500 p-6 rounded-xl shadow-lg mx-4 mt-3 w-[90%] max-w-xs mx-auto">
     {tieneSesion && (
       <button
         onClick={() => navigate("/misviajes")}
         className="w-full py-3 text-white font-medium bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
       >
         Mis Viajes
       </button>
     )}
     <button
       onClick={() => navigate("/contacto")}
       className="w-full py-3 text-white font-medium bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
     >
       Contacto
     </button>
     <button
       onClick={() => navigate("/alldestinos")}
       className="w-full py-3 text-white font-medium bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
     >
       Todos los destinos
     </button>
     <div className="w-full mt-2">
       <HeaderUsuario />
     </div>
     <div className="w-full">
       <Logout />
     </div>
   </div>
        )}

        <h1 className="text-center mt-15 mb-10 text-6xl font-rounded-black font-black text-white-900">
          ¿En qué ciudad quieres <br /> encontrar nuevos amigos?
        </h1>
        <DestinoSearchBar onDestinoSeleccionado={setDestinoSeleccionado} />

        {destinoSeleccionado && (
          <>
          <div className="none">
          <ListaViajes
              destino={destinoSeleccionado}
              onViajesCargados={setViajesDestino}
            />
            <CrearViaje destino={destinoSeleccionado} />
          </div>
           
          </>
        )}
      </div>

      <section className="container mx-auto px-4 py-16 md:py-20 lg:py-24">
        <div className="destinos-container  px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Destinos <span className="text-amber-600">Destacados</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto"></div>
          </div>

          <div className="max-w-7xl bg-gradient-to-r from-blue-200 to-blue-300 rounded-3xl p-6 mx-auto space-y-24">
            {destinos.map((destino, index) => (
              <div
                key={destino.id}
                onClick={() => navigate(`/destinodetalle/${destino.id}`)}
                className={`flex flex-col md:flex-row ${
                  index % 2 !== 0 ? "md:flex-row-reverse" : ""
                } items-center gap-8`}
              >
                <div className="flex-1">
                  {imagenes[index] ? (
                    <img
                      src={imagenes[index]}
                      alt={destino.nombre}
                      className="w-full h-80 md:h-96 object-cover rounded-xl shadow-xl"
                    />
                  ) : (
                    <div className="w-full h-80 md:h-96 bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center rounded-xl shadow-xl">
                      <span className="text-gray-400 text-lg">
                        Imagen no disponible
                      </span>
                    </div>
                  )}
                </div>
                <div
                  className={`flex-1 bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:bg-white/95 ${
                    index % 2 === 0
                      ? "hover:-translate-x-1"
                      : "hover:translate-x-1"
                  }`}
                >
                  <div className="relative z-10">
                    <h3 className="text-3xl font-bold text-gray-900 mb-5 bg-gradient-to-r from-amber-600 to-amber-400 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-400 bg-clip-text text-transparent">
                      {destino.nombre}
                    </h3>
                    <p
                      className="text-gray-700/90 leading-relaxed text-lg font-normal tracking-wide mb-6 relative 
   before:content-[''] before:absolute before:-left-4 before:top-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-amber-400 before:to-amber-600 before:rounded-full
   hover:translate-x-2 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
   group-hover:text-gray-800 group-hover:font-medium
   after:content-[''] after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-0 after:bg-amber-400 after:transition-all after:duration-500 hover:after:w-full"
                    >
                      <span className="relative inline-block py-1 px-2 -mx-2 hover:bg-amber-50/50 hover:rounded-lg transition-colors">
                        {destino.descripcion}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center py-12 mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            ¿No sabes a dónde ir?
            <span className="block w-16 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mt-4"></span>
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
              <DestinoCard destino={dest} />
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
