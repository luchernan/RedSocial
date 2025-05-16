import React, { useState } from 'react';
import type { Viaje } from "../interfaces/tipos";
import ListaViajesFiltrados from './ListaViajesFiltrados';
import { useEffect } from 'react';

type Props = {
  viajes: Viaje[];
  onFiltroActivoChange: (activo: boolean) => void;
};
const FiltroViajesPorUsuario: React.FC<Props> = ({ viajes, onFiltroActivoChange }) => {
  const [genero, setGenero] = useState<string | undefined>(undefined);
  const [edadMinima, setEdadMinima] = useState<number | undefined>(undefined);
  const [edadMaxima, setEdadMaxima] = useState<number | undefined>(undefined);
  const [idioma, setIdioma] = useState<string | undefined>(undefined);
  const [fechaInicio, setFechaInicio] = useState<string>('');
  const [fechaFin, setFechaFin] = useState<string>('');
  const [viajesFiltrados, setViajesFiltrados] = useState<Viaje[]>(viajes);
  const [mostrarFiltros, setMostrarFiltros] = useState<boolean>(false);

  useEffect(() => {
    filtrarViajes();
    const hayFiltroActivo =
      genero || edadMinima || edadMaxima || idioma || fechaInicio || fechaFin;
    onFiltroActivoChange(!!hayFiltroActivo);
  }, [genero, edadMinima, edadMaxima, idioma, fechaInicio, fechaFin, viajes]);

  const calcularEdad = (fechaNacimiento: string): number => {
    const nacimiento = new Date(fechaNacimiento);
    const hoy = new Date();
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const m = hoy.getMonth() - nacimiento.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  };

  const filtrarViajes = () => {
    const inicioFiltro = fechaInicio ? new Date(fechaInicio) : null;
    const finFiltro = fechaFin ? new Date(fechaFin) : null;

    const resultado = viajes.filter((viaje) => {
      const usuario = viaje.usuario;

      const cumpleGenero = !genero || usuario.genero === genero;
      const cumpleIdioma = !idioma || usuario.idioma === idioma;
      const edadUsuario = calcularEdad(usuario.fechaNacimiento);
      const cumpleEdadMinima = !edadMinima || edadUsuario >= edadMinima;
      const cumpleEdadMaxima = !edadMaxima || edadUsuario <= edadMaxima;

      const inicioViaje = new Date(viaje.fechaInicio);
      const finViaje = new Date(viaje.fechaFin);

      const cumpleFechas =
        !inicioFiltro || !finFiltro || (
          inicioViaje <= finFiltro && finViaje >= inicioFiltro
        );

      return cumpleGenero && cumpleIdioma && cumpleEdadMinima && cumpleEdadMaxima && cumpleFechas;
    });

    setViajesFiltrados(resultado);
  };

  return (
    <div className="max-w-9xl font-rounded-black mx-auto px-4 py-8">
      {/* Botón para mostrar filtros */}
      {!mostrarFiltros && (
        <div className="flex  justify-baseline mb-6">
          <button
            onClick={() => setMostrarFiltros(true)}
            className="px-6 py-3 bg-gradient-to-r from-amber-300 to-amber-500  hover:from-blue-700 hover:to-blue-900 text-white font-medium rounded-lg shadow-md transition-transform transform hover:scale-105"
          >
            Filtrar
          </button>
        </div>
      )}

      {/* Formulario de filtros */}
      {mostrarFiltros && (
  <div className="bg-white rounded-xl shadow-lg p-4 mb-8 animate-fadeIn border border-gray-100">
    <form onSubmit={(e) => { e.preventDefault(); filtrarViajes(); }}>
      <div className="flex flex-wrap items-end gap-4">
        {/* Género */}
        <div className="flex-1 min-w-[180px]">
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Género</label>
          <select
            value={genero || ''}
            onChange={(e) => setGenero(e.target.value || undefined)}
            className="w-full p-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all shadow-sm"
          >
            <option value="" className="text-gray-500">Todos</option>
            <option value="hombre" className="text-gray-800 bg-white">Hombre</option>
            <option value="mujer" className="text-gray-800 bg-white">Mujer</option>
            <option value="otro" className="text-gray-800 bg-white">Otro</option>
          </select>
        </div>

        {/* Edad */}
        <div className="flex-1 min-w-[180px]">
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Edad</label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Mín"
              value={edadMinima ?? ''}
              onChange={(e) => setEdadMinima(Number(e.target.value) || undefined)}
              className="w-full p-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all shadow-sm"
            />
            <input
              type="number"
              placeholder="Máx"
              value={edadMaxima ?? ''}
              onChange={(e) => setEdadMaxima(Number(e.target.value) || undefined)}
              className="w-full p-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Idioma */}
        <div className="flex-1 min-w-[180px]">
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Idioma</label>
          <select
            value={idioma || ''}
            onChange={(e) => setIdioma(e.target.value || undefined)}
            className="w-full p-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all shadow-sm"
          >
            <option value="" className="text-gray-500">Todos</option>
            <option value="Español" className="text-gray-800 bg-white">Español</option>
            <option value="Ingles" className="text-gray-800 bg-white">Inglés</option>
            <option value="Frances" className="text-gray-800 bg-white">Francés</option>
            <option value="Italiano" className="text-gray-800 bg-white">Italiano</option>
          </select>
        </div>

        {/* Fechas */}
        <div className="flex-1 min-w-[180px]">
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Fecha Inicio</label>
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            className="w-full p-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all shadow-sm"
          />
        </div>

        <div className="flex-1 min-w-[180px]">
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Fecha Fin</label>
          <input
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            className="w-full p-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all shadow-sm"
          />
        </div>

        {/* Botón (opcional si quieres mantenerlo en línea) */}
        {/* <button
          type="submit"
          className="px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg shadow hover:from-blue-600 hover:to-blue-700 transition-all flex items-center gap-2 h-[42px]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
          </svg>
          <span className="text-sm">Filtrar</span>
        </button> */}
      </div>
    </form>
  </div>
)}

      {/* Resultados */}
      <div className="bg-gradient-to-br from-amber-300 to-amber-500 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-amber-600/40">
        <div className="p-6 border-b border-white/40 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-white drop-shadow-md">
            Resultados ({viajesFiltrados.length})
          </h2>
        </div>
        <div className="p-5 bg-white/90 backdrop-blur-md rounded-b-2xl">
          <ListaViajesFiltrados viajes={viajesFiltrados} />
        </div>
      </div>

    </div>
  );
};

export default FiltroViajesPorUsuario;
