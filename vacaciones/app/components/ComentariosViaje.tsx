import React, { useEffect, useState } from "react";
import { getComentariosPorViaje, getUsuarioPorId } from "../services/api";
import type { Comentario, Usuario } from "../interfaces/tipos";

type ComentarioConUsuario = Comentario & { usuario?: Usuario };

type Props = {
  viajeId: number;
};

const ComentariosViaje: React.FC<Props> = ({ viajeId }) => {
  const [comentarios, setComentarios] = useState<ComentarioConUsuario[]>([]);
  const [cargando, setCargando] = useState(true);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<Usuario | null>(null);

  useEffect(() => {
    async function cargarComentarios() {
      try {
        const data = await getComentariosPorViaje(viajeId);

        const comentariosConUsuarios = await Promise.all(
          data.map(async (comentario) => {
            try {
              const usuario = await getUsuarioPorId(comentario.usuarioId);
              return { ...comentario, usuario };
            } catch (error) {
              console.error(`Error al obtener usuario con ID ${comentario.usuarioId}:`, error);
              return comentario;
            }
          })
        );

        setComentarios(comentariosConUsuarios);
      } catch (err) {
        console.error("Error cargando comentarios:", err);
      } finally {
        setCargando(false);
      }
    }

    cargarComentarios();
  }, [viajeId]);

  if (cargando) return <p className="text-sm text-gray-400">Cargando comentarios...</p>;
  if (!comentarios.length) return <p className="text-sm text-gray-400">No hay comentarios aún.</p>;

  return (
    <>
      <div className="mt-4 space-y-3">
        {comentarios.map((comentario) => (
          <div key={comentario.id} className="flex items-start gap-3">
            <img
              src={comentario.usuario?.fotoPerfil || "/default-avatar.png"}
              alt="Foto de perfil"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p
                className="text-sm font-semibold text-indigo-800 cursor-pointer hover:underline"
                onClick={() => setUsuarioSeleccionado(comentario.usuario || null)}
              >
                {comentario.usuario?.nombre || "Usuario desconocido"}
              </p>
              <p className="text-sm text-gray-700">{comentario.contenido}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal para mostrar la info del usuario seleccionado */}
      {usuarioSeleccionado && (
  <div
    className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center p-4 z-50 animate-fadeIn"
    onClick={() => setUsuarioSeleccionado(null)}
  >
    <div
      className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full relative border border-gray-100 animate-scaleIn"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 rounded-full hover:bg-gray-100"
        onClick={() => setUsuarioSeleccionado(null)}
        aria-label="Cerrar modal"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      
      <div className="flex flex-col items-center">
        <div className="relative mb-6 group">
          <img
            src={usuarioSeleccionado.fotoPerfil || "/default-avatar.png"}
            alt={`Foto de perfil de ${usuarioSeleccionado.nombre}`}
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg group-hover:border-amber-100 transition-all duration-300"
          />
          <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-amber-300 transition-all duration-300 pointer-events-none"></div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-1 text-center">
          {usuarioSeleccionado.nombre}
        </h2>
        
        <div className="w-full mt-6 space-y-3 text-gray-700">
          <div className="flex items-start">
            <span className="inline-block w-24 font-medium text-gray-500">Edad:</span>
            <span>{usuarioSeleccionado.edad || "No disponible"}</span>
          </div>
          
          <div className="flex items-start">
            <span className="inline-block w-24 font-medium text-gray-500">Género:</span>
            <span>{usuarioSeleccionado.genero || "No disponible"}</span>
          </div>
          
          <div className="flex items-start">
            <span className="inline-block w-24 font-medium text-gray-500">Descripción:</span>
            <span className="flex-1">{usuarioSeleccionado.descripcion || "No disponible"}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
)}
    </>
  );
};

export default ComentariosViaje;
