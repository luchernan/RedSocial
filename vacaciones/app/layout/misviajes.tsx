import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import type { ViajeMio } from "../interfaces/tipos";
import { obtenerUsuarioLogueado, getMisViajesParticipados } from "../services/api";

const MisViajes: React.FC = () => {
  const [viajes, setViajes] = useState<ViajeMio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        // 1) Obtengo el usuario logueado
        const usuario = await obtenerUsuarioLogueado();
        const userId = usuario.id!;
        // 2) Obtengo los viajes participados (creados o comentados)
        const data = await getMisViajesParticipados(userId);
        setViajes(data);
      } catch (e) {
        console.error(e);
        setError("No se pudieron cargar tus viajes.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p className="p-4 text-center">Cargando tus viajes…</p>;
  if (error)    return <p className="p-4 text-center text-red-500">{error}</p>;
  if (viajes.length === 0)
    return <p className="p-4 text-center">No tienes viajes registrados aún.</p>;

  return (
    <section className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Mis Viajes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {viajes.map((viaje) => (
          <div
            key={viaje.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
          >
            {/* Imagen de fondo opcional */}
            <div
              className="h-32 bg-cover bg-center"
              style={{
                backgroundImage: `url(/placeholder-destino.jpg)`,
              }}
            />

            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {viaje.destino.nombre}
              </h3>
              <p className="text-sm text-gray-600">
                {viaje.destino.pais}
              </p>
              <p className="mt-2 text-sm text-gray-700">
                {viaje.fechaInicio} &rarr; {viaje.fechaFin}
              </p>
              <button
                onClick={() => navigate(`/destinodetalle/${viaje.destino.id}`)}
                className="mt-4 inline-block px-4 py-2 bg-amber-400 text-white rounded-lg hover:bg-amber-500 transition"
              >
                Ver Detalle
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MisViajes;
