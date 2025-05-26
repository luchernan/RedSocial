import React, { useEffect, useState } from "react";
import { getViajesPorDestino, obtenerUsuarioLogueado } from "../services/api";
import type { Destino, Viaje, Usuario } from "../interfaces/tipos";
import CrearComentario from "./CrearComentario";

type ListaViajesProps = {
  destino: Destino;
  onViajesCargados?: (viajes: Viaje[]) => void;
};

const ListaViajes: React.FC<ListaViajesProps> = ({ destino, onViajesCargados }) => {
  const [viajes, setViajes] = useState<Viaje[]>([]);
  const [error, setError] = useState("");
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    if (destino.id) {
      getViajesPorDestino(destino.id)
        .then((data) => {
          setViajes(data);
          onViajesCargados?.(data);
        })
        .catch(() => setError("No se pudieron cargar los viajes."));
    }
  }, [destino, onViajesCargados]);

  useEffect(() => {
    async function fetchUsuario() {
      try {
        const usuarioLogueado = await obtenerUsuarioLogueado();
        setUsuario(usuarioLogueado);
      } catch {
        console.error("No se pudo obtener el usuario logueado");
      }
    }
    fetchUsuario();
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!viajes.length) return <p className="text-gray-500">No hay viajes para este destino.</p>;
  if (!usuario) return <p>Cargando usuario...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {viajes.map((viaje) => (
            <div
              key={viaje.id}
              className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl overflow-hidden shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 hover:-translate-y-2 border border-gray-700 hover:border-purple-500"
            >
             
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-5">
                <h2 className="text-2xl font-bold text-white text-center truncate">{destino.nombre}</h2>
                <p className="text-sm text-blue-100 text-center mt-1">
                  {viaje.fechaInicio} → {viaje.fechaFin}
                </p>
              </div>

             
              <div className="p-6">
               
                <div className="flex items-start gap-5">
                  <div className="relative">
                    <img
                      src={viaje.usuario.fotoPerfil}
                      alt={`${viaje.usuario.nombre} profile`}
                      className="w-16 h-16 rounded-full object-cover border-4 border-purple-500/30 shadow-lg group-hover:border-purple-500/60 transition-all duration-300"
                    />
                    <span className="absolute -bottom-1 -right-1 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {viaje.usuario.edad}
                    </span>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white">{viaje.usuario.nombre}</h3>

                    <div className="flex gap-2 mt-1 flex-wrap">
                      <span className="text-xs px-2 py-1 bg-purple-900/50 text-purple-200 rounded-full">
                        {viaje.usuario.genero}
                      </span>
                      <span className="text-xs px-2 py-1 bg-blue-900/50 text-blue-200 rounded-full capitalize">
                        {viaje.usuario.idioma}
                      </span>
                    </div>
                  </div>
                </div>

          
                <p className="mt-4 text-gray-300 text-sm leading-relaxed line-clamp-3">{viaje.usuario.descripcion}</p>

                
                <CrearComentario viajeId={viaje.id!} usuario={usuario} />

               
                <div className="mt-5 pt-4 border-t border-gray-700">
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>ID Viaje:</span>
                    <span className="font-mono text-purple-300">{viaje.id}</span>
                  </div>
                </div>
              </div>

             
              <div className="px-6 pb-6">
                <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 transform group-hover:scale-[1.02]">
                  Unirse al viaje
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListaViajes;
