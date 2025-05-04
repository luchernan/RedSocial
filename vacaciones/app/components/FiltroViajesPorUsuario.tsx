import React, { useState } from 'react';
import type { Viaje } from "../interfaces/tipos";
import { obtenerViajesFiltradosPorUsuarios } from '../services/api';
import ListaViajesFiltrados from './ListaViajesFiltrados';


const FiltroViajesPorUsuario = () => {
  const [genero, setGenero] = useState<string | undefined>(undefined);
  const [edadMinima, setEdadMinima] = useState<number | undefined>(undefined);
  const [edadMaxima, setEdadMaxima] = useState<number | undefined>(undefined);
  const [idioma, setIdioma] = useState<string | undefined>(undefined);
  const [viajesFiltrados, setViajesFiltrados] = useState<Viaje[]>([]);

  const fetchViajesFiltrados = async () => {
    const viajes = await obtenerViajesFiltradosPorUsuarios(genero, edadMinima, edadMaxima, idioma);
    setViajesFiltrados(viajes);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mt-4">Filtrar Viajes por Usuario</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchViajesFiltrados();
        }}
        className="space-y-4 mt-4"
      >
        <div className="flex space-x-4 flex-wrap">
          <label>
            Género:
            <select
              value={genero || ''}
              onChange={(e) => setGenero(e.target.value || undefined)}
              className="ml-2 p-2 border rounded"
            >
              <option value="">Todos</option>
              <option value="Hombre">Hombre</option>
              <option value="Mujer">Mujer</option>
              <option value="Otro">Otro</option>
            </select>
          </label>

          <label>
            Edad mínima:
            <input
              type="number"
              value={edadMinima || ''}
              onChange={(e) => setEdadMinima(Number(e.target.value) || undefined)}
              className="ml-2 p-2 border rounded"
            />
          </label>

          <label>
            Edad máxima:
            <input
              type="number"
              value={edadMaxima || ''}
              onChange={(e) => setEdadMaxima(Number(e.target.value) || undefined)}
              className="ml-2 p-2 border rounded"
            />
          </label>

          <label>
            Idioma:
            <select
              value={idioma || ''}
              onChange={(e) => setIdioma(e.target.value || undefined)}
              className="ml-2 p-2 border rounded"
            >
              <option value="">Todos</option>
              <option value="Español">Español</option>
              <option value="Inglés">Inglés</option>
              <option value="Francés">Francés</option>
            </select>
          </label>
        </div>

        <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded">
          Filtrar
        </button>
      </form>

      <div className="mt-8">
        {viajesFiltrados.length === 0 ? (
          <p>No se encontraron viajes con los filtros seleccionados.</p>
        ) : (
            <ListaViajesFiltrados viajes={viajesFiltrados} />
        )}
      </div>
    </div>
  );
};

export default FiltroViajesPorUsuario;
