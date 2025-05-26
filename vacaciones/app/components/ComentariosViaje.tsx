import React, { useEffect, useState } from "react";
import { getComentariosPorViaje, getUsuarioPorId } from "../services/api";
import type { Comentario, Usuario } from "../interfaces/tipos"; type ComentarioConUsuario = Comentario & { usuario?: Usuario };
import { useNavigate } from "react-router";


type Props = {
    viajeId: number;
};

const ComentariosViaje: React.FC<Props> = ({ viajeId }) => {
    const [comentarios, setComentarios] = useState<ComentarioConUsuario[]>([]);
    const [cargando, setCargando] = useState(true);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<Usuario | null>(null);
    const navigate = useNavigate();

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
                                    onClick={() => {
                                        if (comentario.usuario?.id) {
                                            navigate(`/detalleusuario/${comentario.usuario?.id}`);
                                        }
                                    }}
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


           
        </div>
    );
};

export default ComentariosViaje;