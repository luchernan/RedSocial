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

  useEffect(() => {
    async function cargarComentarios() {
      try {
        const data = await getComentariosPorViaje(viajeId);

        // Obtener los datos de los usuarios para cada comentario
        const comentariosConUsuarios = await Promise.all(
          data.map(async (comentario) => {
            try {
              const usuario = await getUsuarioPorId(comentario.usuarioId);
              return { ...comentario, usuario };
            } catch (error) {
              console.error(`Error al obtener usuario con ID ${comentario.usuarioId}:`, error);
              return comentario; // Retornar el comentario sin el usuario en caso de error
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
    <div className="mt-4 space-y-3">
      {comentarios.map((comentario) => (
        <div key={comentario.id} className="flex items-start gap-3">
          <img
            src={comentario.usuario?.fotoPerfil || "/default-avatar.png"}
            alt="Foto de perfil"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-semibold text-indigo-800">
              {comentario.usuario?.nombre || "Usuario desconocido"}
            </p>
            <p className="text-sm text-gray-700">{comentario.contenido}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ComentariosViaje;
