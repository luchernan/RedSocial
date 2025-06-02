import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getAllDestinos } from "../services/api"; 
import Header from "~/components/Header";
import type { Destino } from "~/interfaces/tipos";



const AllDestinos: React.FC = () => {
  const [destinos, setDestinos] = useState<Destino[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDestinos = async () => {
      try {
        const data = await getAllDestinos();
        setDestinos(data);
      } catch (error) {
        console.error("Error al obtener los destinos:", error);
      }
    };

    fetchDestinos();
  }, []);

  const handleClick = (id: number) => {
    navigate(`/destinodetalle/${id}`);
  };
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-300/90 via-amber-100 to-amber-200/90 pb-12 backdrop-blur-sm">
  <Header />
  <div className="container mx-auto px-4 py-8 animate-fadeIn">
    <div className="text-center mb-16">
      <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 mb-4 leading-tight">
        Descubre <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-indigo-600">el mundo</span>
      </h1>
      <div className="w-32 h-1.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 mx-auto mb-6 rounded-full"></div>
      <p className="text-xl text-gray-600/90 max-w-2xl mx-auto font-light">
        Cada destino es una nueva historia por vivir
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
      {destinos.map((destino) => (
        <div
          key={destino.id}
          onClick={() => handleClick(destino.id)}
          className="cursor-pointer group relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden hover:-translate-y-3 border border-white/20 hover:border-amber-300/30"
        >
     
          <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-amber-100/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
          
        
          <div className="relative z-10 p-6 h-full flex flex-col">
        
            <div className="absolute -top-5 -right-5 w-24 h-24 bg-amber-400/10 rounded-full transition-all duration-700 group-hover:scale-150 group-hover:bg-amber-400/20"></div>
            
        
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800 group-hover:text-indigo-700 transition-colors duration-300 pr-2">
                {destino.nombre}
              </h2>
              <span className="bg-gradient-to-br from-amber-500 to-amber-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                {destino.pais}
              </span>
            </div>

            {destino.descripcion && (
              <p className="text-gray-600/90 line-clamp-3 mb-6 font-light leading-relaxed">
                {destino.descripcion}
              </p>
            )}
            
  
            <div className="mt-auto pt-4 border-t border-gray-100/50 group-hover:border-amber-200/70 transition-colors">
              <div className="flex justify-between items-center">
                <span className="flex items-center text-sm font-medium text-gray-500 group-hover:text-amber-600 transition-colors">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  Explorar
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
   </div>
</div>
  );
};

export default AllDestinos;
