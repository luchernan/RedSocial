import { getUsuarioPorId } from "../services/api";
import type { Usuario } from "../interfaces/tipos";
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import Header from "~/components/Header";


const DetalleUsuario = () => {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [error, setError] = useState<string>("");
    const [cargando, setCargando] = useState<boolean>(true);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const obtenerDatosUsuario = async () => {
            try {
                if (id) {
                    const usuarioPorId = await getUsuarioPorId(Number(id));

                    setUsuario(usuarioPorId as Usuario);
                    setError("");
                } else {
                    setError("ID de usuario no proporcionado");
                }
            } catch (error) {
                setError("No se pudo obtener el usuario");
                setUsuario(null);
            } finally {
                setCargando(false);
            }
        };

        obtenerDatosUsuario();
    }, [id]);

    if (cargando) {
        return (
            <div className="flex justify-center  items-center p-8">
                <div className="animate-pulse  flex space-x-4">
                    <div className="rounded-full bg-indigo-200 h-12 w-12"></div>
                    <div className="flex-1 space-y-4 py-1">
                        <div className="h-4 bg-indigo-200 rounded w-3/4"></div>
                        <div className="space-y-2">
                            <div className="h-4 bg-indigo-200 rounded"></div>
                            <div className="h-4 bg-indigo-200 rounded w-5/6"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (

        <div className="bg-gradient-to-r from-blue-300 to-amber-200">
            <Header></Header>


            <div className="max-w-4xl mx-auto  p-6">
                {usuario ? (
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
              
                        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6 text-white">
                            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                                <div className="relative">
                                    <img
                                        src={usuario.fotoPerfil || 'https://via.placeholder.com/150'}
                                        alt="Foto de perfil"
                                        className="w-24 h-24 rounded-full object-cover border-4 border-white/30 shadow-lg"
                                    />
                                    <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-400 rounded-full border-2 border-white"></div>
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold">{usuario.nombre}</h1>
                                    <p className="text-blue-100">{usuario.email}</p>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        <span className="bg-white/20 px-3 py-1 rounded-full text-sm">{usuario.genero}</span>
                                        <span className="bg-white/20 px-3 py-1 rounded-full text-sm">{usuario.edad} años</span>
                                        <span className="bg-white/20 px-3 py-1 rounded-full text-sm">{usuario.pais}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

              
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                            <div className="space-y-4">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Información básica</h3>
                                    <ul className="space-y-3">
                                        <li className="flex justify-between">
                                            <span className="text-gray-600">Idioma:</span>
                                            <span className="font-medium text-gray-900">{usuario.idioma}</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span className="text-gray-600">Ciudad:</span>
                                            <span className="font-medium text-gray-900">{usuario.ciudadLocal}</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span className="text-gray-600">Nacimiento:</span>
                                            <span className="font-medium text-gray-900">{usuario.fechaNacimiento}</span>
                                        </li>
                                    </ul>
                                </div>

                                {usuario.descripcion && (
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Sobre mí</h3>
                                        <p className="text-gray-700 italic">"{usuario.descripcion}"</p> <br />
                                        <p className="text-gray-700 italic">Instagram: @{usuario.instagram}</p>
                                    </div>
                                )}
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Preferencias</h3>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="text-xs font-medium text-gray-400 mb-1">Tipo de usuario</h4>
                                        <div className="bg-white p-3 rounded-md shadow-sm">
                                            <span className="font-medium text-indigo-600">{usuario.tipoUsuario}</span>
                                        </div>
                                    </div>


                                </div>
                                <div className="p-6">
                                    <button
                                        onClick={() => navigate(-1)}
                                        className="mt-4 px-4 py-2 bg-gradient-to-r from-amber-300 to-amber-400 text-white rounded-lg hover:bg-gradient-to-r hover:from-blue-300 hover:to-blue-400 transition-colors"
                                    >
                                        Volver
                                    </button>
                                </div>
                            </div>

                        </div>
<br />
                    </div>
                ) : (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <h3 className="mt-3 text-lg font-medium text-red-800">No se pudo cargar el perfil</h3>
                        <p className="mt-2 text-red-600">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Reintentar
                        </button>
                    </div>
                )}


            </div>


        </div>


    );
};

export default DetalleUsuario;