import React, { useEffect, useState } from "react";
import { getImagenPexels } from "../services/api";
import type { Destino } from "../interfaces/tipos";
import { useNavigate } from "react-router";

type Props = { destino: Destino };

export default function DestinoCard({ destino }: Props) {
  const [imagen, setImagen] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getImagenPexels(destino.nombre).then((url) => setImagen(url)).catch(() => {});
  }, [destino]);

  return (
    <div
    className="relative rounded-2xl overflow-hidden shadow-xl cursor-pointer transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl group"
    onClick={() => navigate(`/destinodetalle/${destino.id}`)}
  >
    {imagen && (
      <div className="relative h-56 md:h-64 bg-cover bg-center transition-all duration-700 group-hover:scale-110">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover:scale-110"
          style={{ backgroundImage: `url(${imagen})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
      </div>
    )}
    
    <div className="absolute bottom-0 left-0 right-0 p-5 text-white z-10">
      <h3 className="text-2xl font-bold mb-1 drop-shadow-md group-hover:text-amber-300 transition-colors duration-300">
        {destino.nombre}
      </h3>
      <div className="flex items-center">
        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
        <p className="text-sm font-medium text-amber-200 drop-shadow-sm">
          {destino.pais}
        </p>
      </div>
    </div>
    
    <div className="absolute top-4 right-4 z-10">
     
    </div>
  </div>
  );
}
