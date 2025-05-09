import { useEffect, useState } from "react";
import { Link } from "react-router";
import { obtenerUsuarioLogueado } from "../services/api"; // ajusta la ruta si es distinta
import type { Usuario } from "../interfaces/tipos"; 




export default function HeaderUsuario() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    async function fetchUsuario() {
      try {
        const usuarioLogueado = await obtenerUsuarioLogueado();
        setUsuario(usuarioLogueado);
      } catch (error) {
        console.error("No se pudo obtener el usuario logueado");
      }
    }
    fetchUsuario();
  }, []);

  if (!usuario) return null;

  return (
    <div className="flex items-center space-x-3 bg-indigo-50/50 hover:bg-indigo-50 px-4 py-2 rounded-full transition-all duration-200 cursor-pointer group">
    <div className="relative">
      <img
        src={usuario.fotoPerfil || "https://via.placeholder.com/150"}
        alt="Foto de perfil"
        className="w-10 h-10 object-cover rounded-full border-2 border-indigo-100 group-hover:border-indigo-200 shadow-sm"
      />
      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
    </div>
    <div className="pr-2">
      <p className="text-sm font-medium text-indigo-900">Hola, {usuario.nombre.split(' ')[0]}</p>
      <Link to="/infousuario" className="text-xs font-medium text-indigo-500 hover:text-indigo-400">
  Mis datos
</Link>
    </div>
  </div>
  );
}
