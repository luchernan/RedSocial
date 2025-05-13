import React, { useState } from 'react';
import type { Viaje } from "../interfaces/tipos";
import ListaViajesFiltrados from './ListaViajesFiltrados';

type Props = {
  viajes: Viaje[];
};

const FiltroViajesPorUsuario: React.FC<Props> = ({ viajes }) => {
  const [genero, setGenero] = useState<string | undefined>(undefined);
  const [edadMinima, setEdadMinima] = useState<number | undefined>(undefined);
  const [edadMaxima, setEdadMaxima] = useState<number | undefined>(undefined);
  const [idioma, setIdioma] = useState<string | undefined>(undefined);
  const [fechaInicio, setFechaInicio] = useState<string>('');
  const [fechaFin, setFechaFin] = useState<string>('');
  const [viajesFiltrados, setViajesFiltrados] = useState<Viaje[]>(viajes);
  const [mostrarFiltros, setMostrarFiltros] = useState<boolean>(false);

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
        !inicioFiltro || !finFiltro ||
        (
          (inicioViaje <= finFiltro && finViaje >= inicioFiltro)
        );

      return cumpleGenero && cumpleIdioma && cumpleEdadMinima && cumpleEdadMaxima && cumpleFechas;
    });

    setViajesFiltrados(resultado);
  };

  return (
    <div className="max-w-9xl mx-auto px-4 py-8">
      {/* Botón para mostrar filtros */}
      {!mostrarFiltros && (
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setMostrarFiltros(true)}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105"
          >
            Filtrar
          </button>
        </div>
      )}

      {/* Formulario de filtros */}
      {mostrarFiltros && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 animate-fadeIn">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              filtrarViajes();
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Género */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Género</label>
                <select
                  value={genero || ''}
                  onChange={(e) => setGenero(e.target.value || undefined)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                >
                  <option value="">Todos los géneros</option>
                  <option value="hombre">Hombre</option>
                  <option value="mujer">Mujer</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              {/* Edad mínima y máxima */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Rango de edad</label>
                <div className="flex space-x-4">
                  <input
                    type="number"
                    placeholder="Mínima"
                    value={edadMinima ?? ''}
                    onChange={(e) => setEdadMinima(Number(e.target.value) || undefined)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                  <input
                    type="number"
                    placeholder="Máxima"
                    value={edadMaxima ?? ''}
                    onChange={(e) => setEdadMaxima(Number(e.target.value) || undefined)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              {/* Idioma */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Idioma</label>
                <select
                  value={idioma || ''}
                  onChange={(e) => setIdioma(e.target.value || undefined)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                >
                  <option value="">Todos los idiomas</option>
                  <option value="Español">Español</option>
                  <option value="Ingles">Inglés</option>
                  <option value="Frances">Francés</option>
                  <option value="Italiano">Italiano</option>
                  <option value="Aleman">Alemán</option>
                  <option value="Chino">Chino</option>
                </select>
              </div>

              {/* Fecha inicio */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Fecha de inicio</label>
                <input
                  type="date"
                  value={fechaInicio}
                  onChange={(e) => setFechaInicio(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>

              {/* Fecha fin */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Fecha de fin</label>
                <input
                  type="date"
                  value={fechaFin}
                  onChange={(e) => setFechaFin(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>

              {/* Botón aplicar filtros */}
              <div className="md:col-span-2 lg:col-span-3 flex justify-center mt-4">
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105"
                >
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                    </svg>
                    Aplicar Filtros
                  </div>
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Resultados */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Resultados ({viajesFiltrados.length})</h2>
        </div>
        <div className="p-4">
          <ListaViajesFiltrados viajes={viajesFiltrados} />
        </div>
      </div>
    </div>
  );
};

export default FiltroViajesPorUsuario;
