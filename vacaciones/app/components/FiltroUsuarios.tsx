import React, { useState } from 'react';
import type { Usuario } from "../interfaces/tipos"; 
import { obtenerUsuariosFiltrados } from '../services/api'; 

const FiltroUsuario = () => {
  const [genero, setGenero] = useState<string | undefined>(undefined);
  const [edadMinima, setEdadMinima] = useState<number | undefined>(undefined);
  const [edadMaxima, setEdadMaxima] = useState<number | undefined>(undefined);
  const [idioma, setIdioma] = useState<string | undefined>(undefined);
  const [usuariosFiltrados, setUsuariosFiltrados] = useState<Usuario[]>([]);


  const fetchUsuariosFiltrados = async () => {
    const usuarios = await obtenerUsuariosFiltrados(genero, edadMinima, edadMaxima, idioma);
    console.log("Usuarios desde la API:", usuarios);
    setUsuariosFiltrados(usuarios);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mt-4">Filtrar Usuarios</h1>

    
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchUsuariosFiltrados();
        }}
        className="space-y-4 mt-4"
      >
        <div className="flex space-x-4">
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
        <h3 className="text-lg font-medium">Usuarios Filtrados:</h3>
        <ul className="space-y-4 mt-4">
          {usuariosFiltrados.length === 0 ? (
            <p>No se encontraron usuarios con los filtros seleccionados.</p>
          ) : (
            usuariosFiltrados.map((usuario) => (
              <li key={usuario.id} className="border p-4 rounded">
                <h4 className="font-semibold">{usuario.nombre}</h4>
                <p>Género: {usuario.genero}</p>
                <p>Edad: {usuario.edad}</p>
                <p>Idioma: {usuario.idioma}</p>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default FiltroUsuario;
