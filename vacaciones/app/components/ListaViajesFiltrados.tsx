import { useState, useEffect } from "react";
import React from "react";
import CrearComentario from "./CrearComentario";
import ComentariosViaje from "./ComentariosViaje";
import { obtenerUsuarioLogueado } from "../services/api";
import type { Usuario, Viaje } from "../interfaces/tipos";
import { useNavigate } from "react-router";

type Props = {
  viajes: Viaje[];
};

const ListaViajesFiltrados: React.FC<Props> = ({ viajes }) => {
  const navigate = useNavigate();

  // Todos los hooks juntos aquí
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function fetchUsuario() {
      try {
        const usuarioLogueado = await obtenerUsuarioLogueado();
        setUsuario(usuarioLogueado);
      } catch (error) {
        console.error("No se pudo obtener el usuario logueado");
      }
    }
    fetchUsuario();
  }, []);

  useEffect(() => {
    setLoaded(true);
  }, []);

  

  if (!usuario) {
    return <p>Cargando usuario...</p>; 
  }

  if (!viajes.length) {
    return <p className="text-gray-500">No hay viajes que coincidan con el filtro.</p>;
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br rounded-2xl from-amber-100 to-amber-400 p-6 transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-indigo-900 mb-2">Compañeros de Viaje</h1>
          <p className="text-lg text-indigo-700">Encuentra a tu compañero ideal para tu próxima aventura</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {viajes.map((viaje) => (
            <div
              key={viaje.id}
              className="group bg-white text-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 text-white">
                <p className="text-sm font-medium">
                  <span className="font-semibold">Viaje:</span> {viaje.fechaInicio} - {viaje.fechaFin}
                </p>
              </div>

              <div className="p-5">
              
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative">
                    <img
                      src={viaje.usuario.fotoPerfil}
                      alt={`Foto de ${viaje.usuario.nombre}`}
                      className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md group-hover:border-indigo-200 transition-all duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?background=random&name=' + viaje.usuario.nombre;
                      }}
                    />
                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm">
                      <div className="w-3 h-3 rounded-full bg-green-400 flex items-center justify-center">
                        <span className="text-xs text-white">✓</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-700 transition-colors">
                      {viaje.usuario.nombre}
                      <span className="text-sm font-normal text-gray-500 ml-2">({viaje.usuario.edad})</span>
                    </h3>

                    <div className="flex flex-wrap gap-2 mt-1">
                      <span className="text-xs px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        {viaje.usuario.genero}
                      </span>
                      <span className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded-full flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M7 4a1 1 0 011-1h4a1 1 0 011 1v1h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h1V4zm2 2h4V5H9v1z" clipRule="evenodd" />
                        </svg>
                        {viaje.usuario.idioma}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-5 line-clamp-3 group-hover:text-gray-800 transition-colors">
                  {viaje.usuario.descripcion}
                </p>
                <ComentariosViaje viajeId={viaje.id} />
                <CrearComentario viajeId={viaje.id} usuario={usuario} />
               </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-gray-500 text-sm">
          Mostrando {viajes.length} viajes disponibles
        </div>
      </div>
    </div>
  );
};

export default ListaViajesFiltrados;
