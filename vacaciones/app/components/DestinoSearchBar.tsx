import React, { useState, useEffect } from "react";
import { getAllDestinos, getImagenPexels } from "../services/api";
import type { Destino } from "../interfaces/tipos";
import { useNavigate } from "react-router";

type DestinoSearchBarProps = {
  onDestinoSeleccionado?: (destino: Destino) => void; // Hacerlo opcional si no es esencial
};

export default function DestinoSearchBar({ onDestinoSeleccionado }: DestinoSearchBarProps) {
  const [destinos, setDestinos] = useState<Destino[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getAllDestinos()
      .then(setDestinos)
      .catch((err) => console.error("Error al obtener destinos:", err));
  }, []);

  const handleBuscar = async () => {
    const encontrado = destinos.find(
      (d) => d.nombre.toLowerCase() === busqueda.trim().toLowerCase()
    );
    
    if (encontrado) {
      if (onDestinoSeleccionado) {
        onDestinoSeleccionado(encontrado);
      }
      // Redirigir a la página de detalle con el ID del destino
      navigate(`/destinodetalle/${encontrado.id}`);
    } else {
      setError("Destino no encontrado");
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto flex flex-col sm:flex-row items-center gap-4">
  <input
    type="text"
    value={busqueda}
    onChange={(e) => setBusqueda(e.target.value)}
    placeholder="Buscar destino por nombre..."
    className="border border-gray-300 p-3 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
  />
  <button
    onClick={handleBuscar}
    className="bg-gradient-to-br from-amber-400 to-amber-600 text-white rounded-lg px-6 py-3 mt-3 sm:mt-0 hover:bg-gradient-to-br hover:from-blue-400 hover:to-blue-600 transition-colors duration-200 shadow-lg transform hover:scale-105"
  >
    Buscar
  </button>
  {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
</div>

  );
}