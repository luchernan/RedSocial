import React, { useEffect, useState } from "react";
import { obtenerUsuarioLogueado, logout, actualizarUsuario } from "../services/api";
import type { Usuario } from "../interfaces/tipos";
import SelectorFotoPerfil from "./SelectorFotoPerfil";
import { useNavigate } from "react-router";


const EditarPerfil = () => {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarUsuario = async () => {
      try {
        const u = await obtenerUsuarioLogueado();
        setUsuario(u);
        setError("");
      } catch (err) {
        console.error("Error al cargar usuario:", err);
        setError("No se pudo cargar el usuario");
      } finally {
        setCargando(false);
      }
    };
    cargarUsuario();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!usuario) return;
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!usuario || usuario.id === undefined) {
      setError("No se puede actualizar: ID de usuario no disponible.");
      return;
    }

    try {
      await actualizarUsuario(usuario.id, usuario);
      setMensaje("Perfil actualizado con éxito");
      setError("");
      setTimeout(() => setMensaje(""), 3000);
    } catch (err) {
      console.error(err);
      setError("Hubo un error al actualizar el perfil");
      setMensaje("");
    }
  };

  if (cargando) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-pulse flex flex-col items-center space-y-4">
          <div className="rounded-full bg-gray-200 h-24 w-24"></div>
          <div className="h-4 bg-gray-200 rounded w-48"></div>
        </div>
      </div>
    );
  }

  if (!usuario) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">

          <div className="bg-gradient-to-br from-amber-400 to-amber-600 p-6 text-white">
            <h1 className="text-2xl font-bold">Editar Perfil</h1>
            <p className="text-blue-100">Actualiza tu información personal</p>
          </div>


          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo*</label>
                  <input
                    type="text"
                    name="nombre"
                    value={usuario.nombre}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Idioma principal</label>
                  <select
                    name="idioma"
                    value={usuario.idioma}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                  >
                    <option value="">Selecciona un idioma</option>
                    <option value="Español">Español</option>
                    <option value="Inglés">Inglés</option>
                    <option value="Francés">Francés</option>
                    <option value="Alemán">Alemán</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de usuario</label>
                  <select
                    name="tipoUsuario"
                    value={usuario.tipoUsuario}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                  >
                    <option value="local">Local</option>
                    <option value="viajero">Viajero</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ciudad local</label>
                  <input
                    type="text"
                    name="ciudadLocal"
                    value={usuario.ciudadLocal}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={usuario.email}
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100 text-gray-600 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                  <textarea
                    name="descripcion"
                    value={usuario.descripcion}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                  />
                </div>
              </div>
            </div>


            <div className="border-t border-gray-200 pt-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Foto de perfil</label>
              <div className="flex items-center space-x-6">
                <div className="relative">
                </div>
                <SelectorFotoPerfil
                  onSeleccionar={(url) => setUsuario({ ...usuario, fotoPerfil: url })}
                />
              </div>
            </div>


            <div className="pt-6 space-y-4">
              {mensaje && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-700 font-medium">{mensaje}</p>
                </div>
              )}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-700 font-medium">{error}</p>
                </div>
              )}

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => window.history.back()}
                  className="px-6 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                  Cancelar
                </button>
                <button
  type="submit"
  onClick={async (e) => {
    e.preventDefault(); 
    
    try {
      await handleSubmit(e);
      await logout();       
      navigate("/"); 
    } catch (error) {
      console.error("Error:", error);

    }
  }}
  className="px-6 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
>
  Guardar cambios y cerrar sesión
</button>
            </div>
        </div>
      </form>
    </div>
      </div >
    </div >
  );
};

export default EditarPerfil;