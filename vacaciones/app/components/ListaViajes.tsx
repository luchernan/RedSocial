import React, { useEffect, useState } from "react";
import { getViajesPorDestino } from "../services/api";
import type { Destino, Viaje } from "../interfaces/tipos";

type ListaViajesProps = {
  destino: Destino;
  onViajesCargados?: (viajes: Viaje[]) => void; // <- nueva prop opcional
};

const ListaViajes: React.FC<ListaViajesProps> = ({ destino, onViajesCargados }) => {
  const [viajes, setViajes] = useState<Viaje[]>([]);
  const [error, setError] = useState("");

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

  if (error) return <p className="text-red-500">{error}</p>;
  if (!viajes.length) return <p className="text-gray-500">No hay viajes para este destino.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen">
    {viajes.map((viaje) => (
      <div
        key={viaje.id}
        className="bg-gray-950 text-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition duration-300"
      >
        <h2 className="text-2xl font-extrabold text-blue-400 mb-3 border-b border-blue-800 pb-1">
          {destino.nombre}
        </h2>
  
        <p className="text-sm text-gray-400 mb-3">
          <span className="font-semibold text-white">Fechas:</span> {viaje.fechaInicio} - {viaje.fechaFin}
        </p>
  
        <div className="flex items-center gap-4">
          <img
            src={viaje.usuario.fotoPerfil}
            alt="Foto de perfil"
            className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
          />
  
          <div className="flex-1 space-y-1">
            <p className="text-lg font-semibold">{viaje.usuario.nombre}</p>
            <p className="text-sm text-gray-400">{viaje.usuario.genero}</p>
            <p className="text-sm text-gray-400 capitalize">{viaje.usuario.idioma}</p>
            <p className="text-sm text-gray-300 italic">{viaje.usuario.descripcion}</p>
            <p className="text-sm text-gray-400">Edad: {viaje.usuario.edad}</p>
            <p className="text-sm text-gray-500">ID del viaje: {viaje.id}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
  
  );
};

export default ListaViajes;
