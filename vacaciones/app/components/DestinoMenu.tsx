import React, { useEffect, useState } from "react";
import { getAllDestinos, getDestinoById } from "../services/api";
import type { Destino } from "../interfaces/tipos";

const DestinoMenu: React.FC = () => {
  const [destinos, setDestinos] = useState<Destino[]>([]);
  const [destinoSeleccionado, setDestinoSeleccionado] = useState<Destino | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cargarDestinos = async () => {
      try {
        const data = await getAllDestinos();
        setDestinos(data);
      } catch (error) {
        console.error("Error al cargar destinos:", error);
      }
    };
    cargarDestinos();
  }, []);

  const handleSelectDestino = async (id: number) => {
    setLoading(true);
    try {
      const destino = await getDestinoById(id);
      setDestinoSeleccionado(destino);
    } catch (error) {
      console.error("Error al obtener destino:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
 
      <aside className="w-1/4 bg-gray-100 p-4 border-r">
        <h2 className="text-xl font-bold mb-4">Destinos</h2>
        <ul>
          {destinos.map((destino) => (
            <li
              key={destino.id}
              className="cursor-pointer hover:text-blue-500"
              onClick={() => handleSelectDestino(destino.id)}
            >
              {destino.nombre}
            </li>
          ))}
        </ul>
      </aside>

     
      <main className="w-3/4 p-6">
        {loading && <p>Cargando destino...</p>}
        {destinoSeleccionado ? (
          <div>
            <h2 className="text-2xl font-bold mb-2">{destinoSeleccionado.nombre}</h2>
            <p><strong>País:</strong> {destinoSeleccionado.pais}</p>
            <p><strong>Descripción:</strong> {destinoSeleccionado.descripcion}</p>
            <p><strong>Wikipedia:</strong> {destinoSeleccionado.wikipediaSlug}</p>
          </div>
        ) : (
          <p>Selecciona un destino para ver los detalles.</p>
        )}
      </main>
    </div>
  );
};

export default DestinoMenu;
