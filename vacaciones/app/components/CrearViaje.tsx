import React, { useEffect, useState } from "react";
import { crearViaje, obtenerUsuarioLogueado } from "../services/api";
import type { Destino } from "../interfaces/tipos"; 

interface CrearViajeProps {
  destino: Destino | null;
}

const CrearViaje: React.FC<CrearViajeProps> = ({ destino }) => {
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
    } catch {
      alert("Error al crear viaje");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Crear viaje a: {destino?.nombre}</h2>
      <input
        type="date"
        value={fechaInicio}
        onChange={(e) => setFechaInicio(e.target.value)}
        className="input"
        required
      />
      <input
        type="date"
        value={fechaFin}
        onChange={(e) => setFechaFin(e.target.value)}
        className="input"
        required
      />
      <button type="submit" className="btn mt-2">
        Crear Viaje
      </button>
    </form>
  );
};

export default CrearViaje;
