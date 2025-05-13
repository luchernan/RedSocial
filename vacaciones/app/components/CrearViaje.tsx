import React, { useEffect, useState } from "react";
import { crearViaje, obtenerUsuarioLogueado } from "../services/api";
import type { Destino } from "../interfaces/tipos"; 

interface CrearViajeProps {
  destino: Destino | null;
}

const CrearViaje: React.FC<CrearViajeProps> = ({ destino }) => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [usuarioId, setUsuarioId] = useState<number | null>(null);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const usuario = await obtenerUsuarioLogueado();
        setUsuarioId(usuario.id ?? null);
      } catch (error) {
        console.error("No hay sesión activa");
      }
    };
    fetchUsuario();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!usuarioId || !destino) return alert("Faltan datos");

    try {
      await crearViaje({
        usuarioId,
        destinoId: destino.id,
        fechaInicio,
        fechaFin,
      });
      alert("Viaje creado con éxito");
      setMostrarFormulario(false);
      setFechaInicio("");
      setFechaFin("");
    } catch {
      alert("Error al crear viaje");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8 bg-white rounded-xl shadow-lg p-6 text-gray-800">
      {!mostrarFormulario ? (
        <button
          onClick={() => setMostrarFormulario(true)}
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Crear viaje a {destino?.nombre}
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">
            Fechas para {destino?.nombre}
          </h2>
          <div>
            <label className="block text-sm font-medium mb-1">Inicio</label>
            <input
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Fin</label>
            <input
              type="date"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-400"
              required
            />
          </div>
          <div className="flex justify-between gap-4">
            <button
              type="submit"
              className="w-full bg-green-600 text-white font-semibold py-2 rounded hover:bg-green-700 transition"
            >
              Confirmar viaje
            </button>
            <button
              type="button"
              onClick={() => setMostrarFormulario(false)}
              className="w-full bg-gray-300 text-gray-800 font-semibold py-2 rounded hover:bg-gray-400 transition"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CrearViaje;
