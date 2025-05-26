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
      
      window.location.reload(); 
    } catch {
    }
  };
  

  return (
    <div className=" max-w-md mx-auto mt-8  rounded-xl  text-gray-800">
      {!mostrarFormulario ? (
        <button
          onClick={() => setMostrarFormulario(true)}
          className=" bg-gradient-to-r from-amber-300 to-amber-500  hover:from-blue-700 hover:to-blue-900 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          Crear viaje a {destino?.nombre}
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
  <h2 className="text-2xl font-bold text-gray-800 text-center">
    Fechas para <span className="text-amber-600">{destino?.nombre}</span>
  </h2>
  
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Fecha de inicio</label>
    <div className="relative">
      <input
        type="date"
        value={fechaInicio}
        onChange={(e) => setFechaInicio(e.target.value)}
        className="w-full bg-white px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all
                   "
        required
      />
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
      </div>
    </div>
  </div>

  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Fecha de fin</label>
    <div className="relative">
      <input
        type="date"
        value={fechaFin}
        onChange={(e) => setFechaFin(e.target.value)}
        className="w-full bg-white px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all
                   "
        required
      />
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
      </div>
    </div>
  </div>

  <div className="flex justify-between gap-4 pt-2">
    <button
      type="button"
      onClick={() => setMostrarFormulario(false)}
      className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
      Cancelar
    </button>
    <button
      type="submit"
      className="w-full px-4 py-3 bg-gradient-to-br from-amber-400 to-amber-600  text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-indigo-600 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
      </svg>
      Confirmar viaje
    </button>
  </div>
</form>
      )}
    </div>
  );
};

export default CrearViaje;
