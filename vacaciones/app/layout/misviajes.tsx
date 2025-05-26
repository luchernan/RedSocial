import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import type { Destino, Usuario, Viaje, ViajeMio } from "../interfaces/tipos";
import {
  obtenerUsuarioLogueado,
  getMisViajesParticipados,
  getDestinoById,
  getImagenPexels,            // asegúrate de exportar esta
} from "../services/api";
import Header from "~/components/Header";

const MisViajes: React.FC = () => {
  const [misViajes, setMisViajes] = useState<ViajeMio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarViajes = async () => {
      try {
        const usuario: Usuario = await obtenerUsuarioLogueado();
        const userId = usuario.id!;
        const viajes: Viaje[] = await getMisViajesParticipados(userId);

        const viajesMios: ViajeMio[] = await Promise.all(
          viajes.map(async (v) => {
            const destino: Destino = await getDestinoById(v.destinoId);
            const imagen = await getImagenPexels(destino.nombre);
            return {
              ...v,
              destino,
              imagenPexels: imagen, 
            } as ViajeMio & { imagenPexels: string };
          })
        );

        setMisViajes(viajesMios as any);
      } catch (e) {
        console.error("Error cargando viajes:", e);
        setError("No se pudieron cargar tus viajes.");
      } finally {
        setLoading(false);
      }
    };

    cargarViajes();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-500 bg-red-50 rounded-lg max-w-md mx-auto">
        {error}
      </div>
    );
  }

  if (!misViajes.length) {
    return (
      <div className="text-center py-12">
      
      </div>
    );
  }

  return (
    <div>
       <Header></Header>

   
<section className="bg-gradient-to-r from-blue-300 to-amber-200 container mx-auto px-4 py-12 md:py-16 lg:py-20">


  <div className="text-center mb-12">
    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 relative inline-block">
      <span className="relative z-10">
        Mis Viajes
        <span className="absolute -bottom-2 left-0 right-0 h-2 bg-amber-300 rounded-full z-0"></span>
      </span>
    </h2>
    <p className="text-lg text-gray-600 mt-4 font-light">Administra todos tus viajes que has creado o comentado. <br /> ¡No faltes a ninguno! </p>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {misViajes.map((viaje) => {
      
      const hoy = new Date();
      const fechaInicio = new Date(viaje.fechaInicio);
      const diferenciaMs = fechaInicio.getTime() - hoy.getTime();
      const diasHastaInicio = Math.ceil(diferenciaMs / (1000 * 60 * 60 * 24));
      

      return (
        <div
          key={viaje.id}
          className="bg-blue-100 rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-50"
        >
          <div className="flex items-center p-5">
            <div className="relative">
              <img
                src={viaje.usuario.fotoPerfil || "/default-avatar.png"}
                alt={`Foto de ${viaje.usuario.nombre}`}
                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
              />
            </div>
            <div className="ml-4">
              <p className="text-lg rounded-black font-medium text-gray-700">{viaje.usuario.nombre}</p>
            </div>
          </div>

          <div className="relative h-56 bg-gray-100 overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url(${(viaje as any).imagenPexels})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30"></div>
       
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
              <span className="text-sm font-medium text-gray-800 flex items-center">
                {diasHastaInicio} días
                <svg className="w-4 ms-1 h-4 mr-1 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </span>
              
            </div>
          </div>

       
          <div className="p-6">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-800 mb-1">{viaje.destino.nombre}</h3>
              <p className="text-gray-600 flex items-center">
                {viaje.destino.pais}
              </p>
            </div>

            <div className="flex items-center text-sm text-gray-500 mb-6">
              <svg className="w-5 h-5 mr-2 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>
                {new Date(viaje.fechaInicio).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })} - {new Date(viaje.fechaFin).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
            </div>

            <button
              onClick={() => navigate(`/destinodetalle/${viaje.destino.id}`)}
              className="w-full px-5 py-3 bg-amber-500 text-white font-medium rounded-xl hover:bg-amber-600 transition-all duration-300 shadow hover:shadow-md flex items-center justify-center"
            >
              Ver detalles
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      );
    })}
  </div>
</section>
</div>
 );
};

export default MisViajes;
