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
    <div className="grid gap-4 p-4">
      {viajes.map((viaje) => (
        <div key={viaje.id} className="bg-white shadow rounded p-4">
          <p>
            <span className="font-semibold">Fechas:</span> {viaje.fechaInicio} - {viaje.fechaFin}
          </p>
          <div className="mt-2 flex items-center gap-4">
            <img
              src={viaje.usuario.fotoPerfil}
              alt="Foto de perfil"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <p className="font-semibold">{viaje.usuario.nombre}</p>
              <p className="text-sm text-gray-600">{viaje.usuario.genero}</p>
              <p className="text-sm text-gray-600">
                {viaje.usuario.idioma &&
                  viaje.usuario.idioma.charAt(0).toUpperCase() + viaje.usuario.idioma.slice(1)}
              </p>
              <p className="text-sm text-gray-600">{viaje.usuario.descripcion}</p>
              <p className="text-sm text-gray-600">{viaje.usuario.edad}</p>
            </div>

            {viaje.usuario.id && (
        <button
            onClick={() => manejarChat(viaje.usuario.id!)}
             className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded">
           Chatear
            </button>
            )}

          </div>
        </div>
      ))}
    </div>
  );
};

export default ListaViajesFiltrados;
