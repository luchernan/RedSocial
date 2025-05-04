import React, { useState, useEffect } from "react";
import { getAllDestinos } from "../services/api"; 
import type { Destino } from "../interfaces/tipos"; 

type DestinoSearchBarProps = {
  onDestinoSeleccionado: (destino: Destino) => void;
};

export default function DestinoSearchBar({ onDestinoSeleccionado }: DestinoSearchBarProps) {
  const [destinos, setDestinos] = useState<Destino[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [resultado, setResultado] = useState<Destino | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllDestinos()
      .then(setDestinos)
      .catch((err) => console.error("Error al obtener destinos:", err));
  }, []);

  const handleBuscar = () => {
    const encontrado = destinos.find(
      (d) => d.nombre.toLowerCase() === busqueda.trim().toLowerCase()
    );
    if (encontrado) {
      setResultado(encontrado);
      setError("");
      onDestinoSeleccionado(encontrado);
    } else {
      setResultado(null);
      setError("Destino no encontrado");
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <input
        type="text"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Buscar destino por nombre..."
        className="border p-2 rounded w-full"
      />
      <button
        onClick={handleBuscar}
        className="bg-blue-500 text-white mt-2 px-4 py-2 rounded hover:bg-blue-600"
      >
        Buscar
      </button>

      {resultado && (
        <div className="mt-4 border rounded p-4 shadow">
          <h2 className="text-xl font-bold">{resultado.nombre}</h2>
          <p className="text-sm text-gray-600">{resultado.pais}</p>
          <p className="mt-2">{resultado.descripcion}</p>
          <a
            href={`https://es.wikipedia.org/wiki/${resultado.wikipediaSlug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline mt-2 block"
          >
            Ver en Wikipedia
          </a>
        </div>
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
