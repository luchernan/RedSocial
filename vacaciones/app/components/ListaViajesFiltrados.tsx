// ListaViajesFiltrados.tsx
import React from "react";
import type { Viaje } from "../interfaces/tipos";

type Props = {
  viajes: Viaje[];
};

const ListaViajesFiltrados: React.FC<Props> = ({ viajes }) => {
  if (!viajes.length) return <p className="text-gray-500">No hay viajes que coincidan con el filtro.</p>;

  return (
    <div className="grid gap-4 p-4">
      {viajes.map((viaje) => (
        <div key={viaje.id} className="bg-white shadow rounded p-4">
          {/* <h2 className="text-xl font-bold mb-2">{viaje.destino.nombre}</h2> */}
          <p>
            <span className="font-semibold">Fechas:</span> {viaje.fechaInicio} - {viaje.fechaFin}
          </p>
          <div className="mt-2 flex items-center gap-4">
            <img
              src={viaje.usuario.fotoPerfil}
              alt="Foto de perfil"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold">{viaje.usuario.nombre}</p>
              <p className="text-sm text-gray-600">{viaje.usuario.genero}</p>
              <p className="text-sm text-gray-600"> {viaje.usuario.idioma &&
              viaje.usuario.idioma.charAt(0).toUpperCase() + viaje.usuario.idioma.slice(1)} </p>

              <p className="text-sm text-gray-600">{viaje.usuario.edad}</p>
            </div>  
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListaViajesFiltrados;
