import React, { useEffect, useState } from "react";
import { getComentariosPorViaje, getUsuarioPorId } from "../services/api";
import type { Comentario, Usuario } from "../interfaces/tipos";type ComentarioConUsuario = Comentario & { usuario?: Usuario };

type Props = {
  viajeId: number;
};

const ComentariosViaje: React.FC<Props> = ({ viajeId }) => {
  const [comentarios, setComentarios] = useState<ComentarioConUsuario[]>([]);
  const [cargando, setCargando] = useState(true);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<Usuario | null>(null);


  useEffect(() => {
    if (usuarioSeleccionado) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [usuarioSeleccionado]);

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
    <div className="relative">
     
      <div className="mt-4 space-y-3">
        {comentarios.map((comentario) => (
          <div key={comentario.id} className="flex items-start gap-3">
            <img
              src={comentario.usuario?.fotoPerfil || "/default-avatar.png"}
              alt="Foto de perfil"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>

                <div className="flex">
                <p
                className="text-sm font-semibold text-indigo-800 cursor-pointer hover:underline"
                onClick={() => setUsuarioSeleccionado(comentario.usuario || null)}
              >
                {comentario.usuario?.nombre || "Usuario desconocido"}
              </p>
              <p className="ms-1 text-sm font-semibold text-gray-400 cursor-pointer hover:underline">
                {comentario.usuario?.edad || "Usuario desconocido"}
              </p>
                </div>
          


              <p className="text-sm text-gray-700">{comentario.contenido}</p>
            </div>
          </div>
        ))}
      </div>

      
      {usuarioSeleccionado && (
        <div className="fixed inset-0 z-[9999]">
     
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setUsuarioSeleccionado(null)}
          />
          

          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div
              className="bg-white rounded-xl shadow-xl max-w-md w-full relative max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
      
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors p-2 rounded-full hover:bg-gray-100"
                onClick={() => setUsuarioSeleccionado(null)}
                aria-label="Cerrar modal"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
       
              <div className="p-6">
                <div className="flex flex-col items-center mb-4">
                  <div className="relative mb-4">
                    <img
                      src={usuarioSeleccionado.fotoPerfil || "/default-avatar.png"}
                      alt={`Foto de ${usuarioSeleccionado.nombre}`}
                      className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
                    />
                  </div>
                  
                  <h2 className="text-xl font-bold text-gray-800 text-center">
                    {usuarioSeleccionado.nombre}
                  </h2>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex">
                    <span className="w-28 font-medium text-gray-500">Edad:</span>
                    <span>{usuarioSeleccionado.edad || "No especificado"}</span>
                  </div>
                  
                  <div className="flex">
                    <span className="w-28 font-medium text-gray-500">Género:</span>
                    <span>{usuarioSeleccionado.genero || "No especificado"}</span>
                  </div>
                  
                  <div className="flex">
                    <span className="w-28 font-medium text-gray-500">Descripción:</span>
                    <span className="flex-1">{usuarioSeleccionado.descripcion || "No hay descripción"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComentariosViaje;