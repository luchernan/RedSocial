import React, { useEffect, useState } from "react";
import { getViajesPorDestino } from "../services/api";
import type { Destino, Viaje } from "../interfaces/tipos";

type ListaViajesProps = {
  destino: Destino;
};

const ListaViajes: React.FC<ListaViajesProps> = ({ destino }) => {
  const [viajes, setViajes] = useState<Viaje[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (destino.id) {
      getViajesPorDestino(destino.id)
        .then(setViajes)
        .catch(() => setError("No se pudieron cargar los viajes."));
    }
  }, [destino]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!viajes.length) return <p className="text-gray-500">No hay viajes para este destino.</p>;

  return (
    <div className="grid gap-4 p-4">
      {viajes.map((viaje) => (
        <div key={viaje.id} className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-bold mb-2">{destino.nombre}</h2>
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
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListaViajes;
