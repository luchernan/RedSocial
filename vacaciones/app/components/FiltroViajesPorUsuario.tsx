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
    <div>
      <h1 className="text-2xl font-bold text-center mt-4">Filtrar Viajes por Usuario</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          filtrarViajes();
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
              <option value="hombre">Hombre</option>
              <option value="mujer">Mujer</option>
              <option value="otro">Otro</option>
            </select>
          </label>

          <label>
            Edad mínima:
            <input
              type="number"
              value={edadMinima ?? ''}
              onChange={(e) => setEdadMinima(Number(e.target.value) || undefined)}
              className="ml-2 p-2 border rounded"
            />
          </label>

          <label>
            Edad máxima:
            <input
              type="number"
              value={edadMaxima ?? ''}
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
              <option value="Ingles">Inglés</option>
              <option value="Frances">Francés</option>
              <option value="Italiano">Italiano</option>
              <option value="Aleman">Alemán</option>
              <option value="Chino">Chino</option>
              <option value="Noruego">Noruego</option>
              <option value="Fines">Finés</option>
              <option value="Neerlandes">Neerlandés</option>
            </select>
          </label>

          <label>
            Fecha inicio:
            <input
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              className="ml-2 p-2 border rounded"
            />
          </label>

          <label>
            Fecha fin:
            <input
              type="date"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
              className="ml-2 p-2 border rounded"
            />
          </label>
        </div>

        <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded">
          Filtrar
        </button>
      </form>

      <div className="mt-8">
        <ListaViajesFiltrados viajes={viajesFiltrados} />
      </div>
    </div>
  );
};

export default FiltroViajesPorUsuario;
