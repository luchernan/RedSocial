import { useState, useEffect } from "react";
import React from "react";
import CrearComentario from "./CrearComentario";
import ComentariosViaje from "./ComentariosViaje";
import { obtenerUsuarioLogueado, deleteViajeById } from "../services/api";
import type { Usuario, Viaje } from "../interfaces/tipos";
import { useNavigate } from "react-router";

type Props = {
  viajes: Viaje[];
  onRefresh?: () => void;
};

const ListaViajesFiltrados: React.FC<Props> = ({ viajes, onRefresh }) => {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [eliminandoId, setEliminandoId] = useState<number | null>(null);


  useEffect(() => {
    obtenerUsuarioLogueado()
      .then(setUsuario)
      .catch(() => setUsuario(null))
      .finally(() => setLoaded(true));
  }, []);

  const handleDelete = async (viajeId: number) => {
    setEliminandoId(viajeId);
    try {
      await deleteViajeById(viajeId);
      onRefresh?.();
    } catch (err) {
      console.error("Error al eliminar viaje:", err);
    } finally {
      setEliminandoId(null);
    }
    window.location.reload();
  };

  if (!loaded) return <p>Cargando usuario…</p>;
  if (!usuario) return <div className="flex justify-center">
    <button
      onClick={() => navigate('/')}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
    >
      Iniciar sesión
    </button>
  </div>
  if (!viajes.length)
    return <p className="text-gray-500">No hay viajes que coincidan con el filtro.</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br rounded-2xl from-amber-100 to-amber-400 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-indigo-900 mb-2">Compañeros de Viaje</h1>
          <p className="text-lg text-indigo-700">
            Encuentra a tu compañero ideal para tu próxima aventura
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {viajes.map((viaje) => (
            <div
              key={viaje.id}
              className="group bg-white text-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 overflow-hidden"
            >

              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 text-white">
                <p className="text-sm font-medium">
                  <span className="font-semibold">Viaje:</span> {viaje.fechaInicio} -{" "}
                  {viaje.fechaFin}
                </p>
              </div>


              <div className="p-5 space-y-4">

                <div className="flex items-center gap-4">
                  <img
                    src={viaje.usuario.fotoPerfil}
                    alt={`Foto de ${viaje.usuario.nombre}`}
                    className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://ui-avatars.com/api/?background=random&name=" + viaje.usuario.nombre;
                    }}
                  />
                  <div>
                    <h3
                      onClick={() => navigate(`/detalleusuario/${viaje.usuarioId}`)}
                      className="text-xl font-bold  hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-indigo-600 hover:to-indigo-500"
                    >
                      {viaje.usuario.nombre}
                    </h3>

                    <div className="flex">
                      <p className="text-sm text-gray-500">{viaje.usuario.idioma}, </p>
                      <p className="text-sm text-gray-500">{viaje.usuario.edad}</p>
                    </div>


                  </div>
                </div>


                <ComentariosViaje viajeId={viaje.id} />
                <CrearComentario viajeId={viaje.id} usuario={usuario} />

                <div className="flex justify-between items-center mt-4">


                  {viaje.usuarioId === usuario.id && (
                    <button
                      onClick={() => handleDelete(viaje.id)}
                      disabled={eliminandoId === viaje.id}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg disabled:opacity-50"
                    >
                      {eliminandoId === viaje.id ? "Eliminando…" : "Eliminar"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-gray-500 text-sm">
          Mostrando {viajes.length} viajes disponibles
        </div>
      </div>
    </div>
  );
};

export default ListaViajesFiltrados;