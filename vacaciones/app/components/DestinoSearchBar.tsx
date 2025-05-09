import React, { useState, useEffect } from "react";
import { getAllDestinos, getImagenPexels } from "../services/api";
import type { Destino } from "../interfaces/tipos";

type DestinoSearchBarProps = {
  onDestinoSeleccionado: (destino: Destino) => void;
};

const PEXELS_API_KEY = "TU_API_KEY_DE_PEXELS"; // Sustituye por tu clave real

export default function DestinoSearchBar({ onDestinoSeleccionado }: DestinoSearchBarProps) {
  const [destinos, setDestinos] = useState<Destino[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [resultado, setResultado] = useState<Destino | null>(null);
  const [imagen, setImagen] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllDestinos()
      .then(setDestinos)
      .catch((err) => console.error("Error al obtener destinos:", err));
  }, []);

  const obtenerImagenPexels = async (ciudad: string): Promise<string | null> => {
    try {
      const res = await fetch(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(ciudad)}&per_page=10`,
        {
          headers: {
            Authorization: PEXELS_API_KEY,
          },
        }
      );
      const data = await res.json();
      const fotos = data.photos;
      if (fotos && fotos.length > 0) {
        const aleatoria = fotos[Math.floor(Math.random() * fotos.length)];
        return aleatoria?.src?.landscape || null;
      }
      return null;
    } catch (err) {
      console.error("Error al obtener imagen de Pexels:", err);
      return null;
    }
  };

  const handleBuscar = async () => {
    const encontrado = destinos.find(
      (d) => d.nombre.toLowerCase() === busqueda.trim().toLowerCase()
    );
    if (encontrado) {
      setResultado(encontrado);
      setError("");
      onDestinoSeleccionado(encontrado);
  
      const imagenPexels = await getImagenPexels(encontrado.nombre); // 🔄 Desde api.ts
      setImagen(imagenPexels);
    } else {
      setResultado(null);
      setImagen(null);
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
          {imagen && (
            <img
              src={imagen}
              alt={`Vista de ${resultado.nombre}`}
              className="mt-4 rounded shadow-md max-h-64 object-cover w-full"
            />
          )}
        </div>
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
