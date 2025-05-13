import React from "react";
import type { Viaje } from "../interfaces/tipos";
import { useNavigate } from "react-router";

type Props = {
  viajes: Viaje[];
};

const ListaViajesFiltrados: React.FC<Props> = ({ viajes }) => {
  const navigate = useNavigate();

  const manejarChat = (usuarioId: number ) => {
    // Redirige a la página de chat con ese usuario
    navigate(`/chat/${usuarioId}`);
  };

  if (!viajes.length) return <p className="text-gray-500">No hay viajes que coincidan con el filtro.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen">
  {viajes.map((viaje) => (
    <div
      key={viaje.id}
      className="bg-gray-950 text-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition duration-300"
    >
      <p className="text-sm text-gray-400 mb-2">
        <span className="font-semibold text-white">Fechas:</span> {viaje.fechaInicio} - {viaje.fechaFin}
      </p>

      <div className="flex items-center gap-4">
        <img
          src={viaje.usuario.fotoPerfil}
          alt="Foto de perfil"
          className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
        />

        <div className="flex-1">
          <p className="text-lg font-bold">{viaje.usuario.nombre}</p>
          <p className="text-sm text-gray-400">{viaje.usuario.genero}</p>
          <p className="text-sm text-gray-400 capitalize">{viaje.usuario.idioma}</p>
          <p className="text-sm text-gray-300 italic truncate">{viaje.usuario.descripcion}</p>
          <p className="text-sm text-gray-400">Edad: {viaje.usuario.edad}</p>
        </div>
      </div>

      {viaje.usuario.id && (
        <button
          onClick={() => manejarChat(viaje.usuario.id!)}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow hover:scale-105 transition transform"
        >
          Chatear
        </button>
      )}
    </div>
  ))}
</div>

  
  );
};

export default ListaViajesFiltrados;
