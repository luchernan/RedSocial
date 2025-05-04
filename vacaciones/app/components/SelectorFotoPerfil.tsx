import React, { useEffect, useState } from "react";
import { obtenerFotosPerfil } from "../services/api";
import type { Fotoperfil } from "../interfaces/tipos"; // Asegúrate de tener esta interfaz

interface Props {
  onSeleccionar: (url: string) => void;
}

const SelectorFotoPerfil: React.FC<Props> = ({ onSeleccionar }) => {
  const [fotos, setFotos] = useState<Fotoperfil[]>([]);
  const [seleccionada, setSeleccionada] = useState<string | null>(null);

  useEffect(() => {
    const fetchFotos = async () => {
      try {
        const fotos = await obtenerFotosPerfil();
        setFotos(fotos);
      } catch (error) {
        console.error("Error al obtener fotos de perfil:", error);
      }
    };
    fetchFotos();
  }, []);

  const handleSeleccion = (url: string) => {
    setSeleccionada(url);
    onSeleccionar(url);
  };

  return (
    <div className="flex flex-wrap gap-4">
      {fotos.map((foto) => (
        <img
          key={foto.id}
          src={foto.url}
          alt="Foto de perfil"
          onClick={() => handleSeleccion(foto.url)}
          className={`w-20 h-20 object-cover rounded-full border-4 cursor-pointer ${
            seleccionada === foto.url ? "border-blue-500" : "border-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

export default SelectorFotoPerfil;
