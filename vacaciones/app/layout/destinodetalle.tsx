import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { getDestinoById, getImagenPexels } from "../services/api";
import type { Destino, Viaje } from "../interfaces/tipos";
import ListaViajes from "~/components/ListaViajes";
import Header from "~/components/Header";

import Logout from "~/components/Logout";
import { useLoaderData, useOutletContext } from "react-router";
import CrearViaje from "~/components/CrearViaje";
import DestinoSearchBar from "~/components/DestinoSearchBar";
import FiltroViajesPorUsuario from "~/components/FiltroViajesPorUsuario"; // Asegúrate de importar
import bg from "../media/fondo2.jpg";
import { Link } from "react-router";

export default function DestinoDetalle() {
    const { destinoId } = useParams();
    const navigate = useNavigate();
    const [destino, setDestino] = useState<Destino | null>(null);
    const [imagen, setImagen] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [viajesDestino, setViajesDestino] = useState<Viaje[]>([]);
    const [filtroActivo, setFiltroActivo] = useState(false);

    useEffect(() => {
        const cargarDestino = async () => {
            try {
                if (!destinoId || isNaN(Number(destinoId))) {
                    setError("ID de destino inválido");
                    setLoading(false);
                    return;
                }

                const id = Number(destinoId);
                const destinoData = await getDestinoById(id);

                if (destinoData) {
                    setDestino(destinoData);
                    const imagenPexels = await getImagenPexels(destinoData.nombre);
                    setImagen(
                        imagenPexels && imagenPexels.trim() !== "" ? imagenPexels : null
                    );
                } else {
                    setError("Destino no encontrado");
                }
            } catch (err) {
                setError("Error al cargar el destino");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        cargarDestino();
    }, [destinoId]);

    if (loading) return <div>Cargando...</div>;
    if (error) return <div className="text-red-500 p-4">{error}</div>;
    if (!destino) return <div>Destino no encontrado</div>;

    return (
        <div className=" font-rounded-black">
            <Header></Header>
            <div className="w-full min-h-screen bg-gradient-to-b from-white to-amber-200 text-white">
                <div className="max-w-8xl mx-auto p-6">
                    {/* <button
            onClick={() => navigate(-1)}
            className="mb-6 px-4 py-2 bg-white text-gray-800 font-semibold rounded hover:bg-gray-100 transition"
          >
            ← Volver
          </button> */}

                    <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-10 transition-all duration-300 hover:shadow-3xl group">
                        {imagen && (
                            <div
                                className="h-[400px] bg-cover bg-center transition-all duration-700 group-hover:scale-105"
                                style={{
                                    backgroundImage: `url(${imagen})`,
                                    filter: "brightness(0.7)",
                                }}
                            />
                        )}

                        {imagen && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center px-4">
                                    <h2 className="text-white text-5xl md:text-7xl font-extrabold drop-shadow-2xl mb-2 animate-fadeIn relative">
                                        <span className="absolute inset-0 text-black -z-10 blur-md">
                                            {destino.nombre}
                                        </span>
                                        {destino.nombre}
                                    </h2>
                                    <div className="w-20 h-1 bg-white/80 mx-auto mb-4 rounded-full"></div>
                                    <p className="text-white/90 text-xl md:text-2xl font-medium drop-shadow-md">
                                        {destino.pais}
                                    </p>
                                </div>
                            </div>
                        )}

                        <div className="relative bg-white p-8 rounded-b-2xl">
                            <div className="absolute -top-5 left-6 bg-white px-4 py-2 rounded-full shadow-md">
                                <span className="font-semibold text-gray-800 flex items-center">
                                    <svg
                                        className="w-5 h-5 text-amber-500 mr-1"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    Destino verificado
                                </span>
                            </div>
                            <div className="mt-8 space-y-6">

                                <div className="relative">
                                    <div className="absolute -left-4 top-0 h-full w-1 bg-gradient-to-b from-blue-300 to-blue-600 rounded-full"></div>
                                    <p className="pl-6 text-gray-700 leading-relaxed text-lg font-serif italic">
                                        "{destino.descripcion}"
                                    </p>
                                </div>

                                <div className="flex justify-end">
                                    <a
                                        href={`https://es.wikipedia.org/wiki/${destino.wikipediaSlug}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="relative inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-300 to-amber-500  hover:from-blue-700 hover:to-blue-900 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden"
                                    >
                                        <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-500"></span>

                                        <svg
                                            className="w-5 h-5 mr-3 transition-transform duration-300 group-hover:rotate-12"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                            />
                                        </svg>

                                        <span className="relative">
                                            Saber Más
                                            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-500 group-hover:w-full"></span>
                                        </span>
                                    </a>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div className="text-center mb-1">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Encuentra a tu media naranja 🍊</h1>
                        <p className="text-gray-600">Filtra por tus preferencias para encontrar la persona perfecta</p>
                    </div>

                    {destino && (
                        <>
                            <div className="flex">

                                <FiltroViajesPorUsuario
                                    viajes={viajesDestino}
                                    onFiltroActivoChange={setFiltroActivo}
                                />

                            </div>



                            <div style={{ display: 'none' }}>

                                {!filtroActivo && (
                                    <ListaViajes
                                        destino={destino}
                                        onViajesCargados={setViajesDestino}
                                    />
                                )}


                            </div>


                        </>
                    )}
<div className="text-center mb-1">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">¿No encuentras al compañero ideal?</h1>
                        <p className="text-gray-600">¡Crea tu propio Viaje!</p>
                    <CrearViaje destino={destino} />
                    </div>
                </div>
            </div>
        </div>
    );
}
