import { useState } from "react";
import { crearUsuario } from "../services/api";
import type { Usuario, Fotoperfil } from "../interfaces/tipos";
import { useNavigate } from "react-router";
import SelectorFotoPerfil from "~/components/SelectorFotoPerfil";
import Header from "~/components/Header";
import ProfilePhotoUploader from "~/components/ProfilePhotoUploader";

const UsuarioForm = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState<Usuario>({
    email: "",
    password: "",
    fechaNacimiento: "",
    nombre: "",
    genero: "otro",
    descripcion: "",
    instagram: "",
    tipoUsuario: "local",
    idioma: "",
    pais: "España",
    ciudadLocal: "",
    fotoPerfil: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const fecha = usuario.fechaNacimiento;
    let fechaFormateada = fecha;
  
    if (fecha.includes("/")) {
      const [dia, mes, anio] = fecha.split("/");
      fechaFormateada = `${anio}-${mes.padStart(2, "0")}-${dia.padStart(2, "0")}`;
    }
  
    const usuarioFinal = {
      ...usuario,
      fechaNacimiento: fechaFormateada,
      fotoPerfil: usuario.fotoPerfil || "https://via.placeholder.com/150" 
    };
  
    try {
      await crearUsuario(usuarioFinal);
      alert("Usuario creado con éxito");
      navigate("/");
    } catch {
      alert("Error al crear el usuario");
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-300 to-amber-200">
      <Header></Header>
    <div className="min-h-screen bg-gradient-to-br font-rounded-black from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="bg-gradient-to-br from-amber-400 to-amber-600  py-4 px-6">
            <h1 className="text-2xl font-bold text-white">Crear nueva cuenta</h1>
            <p className="text-indigo-100">Completa tus datos para registrarte</p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-rounded-black font-medium text-gray-700 mb-1">Email*</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={usuario.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                  />
                </div>

                <div>
                  <label className="block font-rounded-black text-sm font-medium text-gray-700 mb-1">Contraseña*</label>
                  <input
                    type="password"
                    name="password"
                    required
                    value={usuario.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                  />
                </div>

                <div>
                  <label className="block font-rounded-black text-sm font-medium text-gray-700 mb-1">Fecha de nacimiento*</label>
                  <input
                    type="date"
                    name="fechaNacimiento"
                    value={usuario.fechaNacimiento}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                  />
                </div>

                <div>
                  <label className="block font-rounded-black text-sm font-medium text-gray-700 mb-1">Nombre completo*</label>
                  <input
                    type="text"
                    name="nombre"
                    required
                    value={usuario.nombre}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                  />
                </div>
                <div>
                  <label className="block font-rounded-black text-sm font-medium text-gray-700 mb-1">Instagram (sin @)</label>
                  <input
                    type="text"
                    name="instagram"
                    required
                    value={usuario.instagram}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                  />
                </div>

                <div>
                  <label className="block font-rounded-black text-sm font-medium text-gray-700 mb-1">Género</label>
                  <select
                    name="genero"
                    value={usuario.genero}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                  >
                    <option value="hombre" className="text-gray-900">Hombre</option>
                    <option value="mujer" className="text-gray-900">Mujer</option>
                    <option value="otro" className="text-gray-900">Otro</option>
                  </select>
                </div>
              </div>

          
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de usuario</label>
                  <select
                    name="tipoUsuario"
                    value={usuario.tipoUsuario}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                  >
                    <option value="local" className="text-gray-900">Local</option>
                    <option value="viajero" className="text-gray-900">Viajero</option>
                  </select>
                </div>

                <div>
                  <label className="block font-rounded-black text-sm font-medium text-gray-700 mb-1">Idioma principal</label>
                  <select
                    name="idioma"
                    value={usuario.idioma}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                  >
                    <option value="" className="text-gray-900">Selecciona un idioma</option>
                    <option value="Español" className="text-gray-900">Español</option>
                    <option value="Ingles" className="text-gray-900">Inglés</option>
                    <option value="Frances" className="text-gray-900">Francés</option>
                    <option value="Italiano" className="text-gray-900">Italiano</option>
                    <option value="Aleman" className="text-gray-900">Alemán</option>
                    <option value="Chino" className="text-gray-900">Chino</option>
                    <option value="Noruego" className="text-gray-900">Noruego</option>
                    <option value="Finas" className="text-gray-900">Finés</option>
                    <option value="Neerlandes" className="text-gray-900">Neerlandés</option>
                  </select>
                </div>

                <div>
                  <label className="block font-rounded-black text-sm font-medium text-gray-700 mb-1">País</label>
                  <select
                    name="pais"
                    value={usuario.pais}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                  >
                    <option value="España" className="text-gray-900">España</option>
                    <option value="Alemania" className="text-gray-900">Alemania</option>
                    <option value="Reino Unido" className="text-gray-900">Reino Unido</option>
                    <option value="Irlanda" className="text-gray-900">Irlanda</option>
                    <option value="Holanda" className="text-gray-900">Holanda</option>
                    <option value="Francia" className="text-gray-900">Francia</option>
                    <option value="Italia" className="text-gray-900">Italia</option>
                    <option value="Noruega" className="text-gray-900">Noruega</option>
                    <option value="China" className="text-gray-900">China</option>
                    <option value="Finlandia" className="text-gray-900">Finlandia</option>
                  </select>
                </div>

                <div>
                  <label className="block font-rounded-black text-sm font-medium text-gray-700 mb-1">Ciudad</label>
                  <input
                    type="text"
                    name="ciudadLocal"
                    value={usuario.ciudadLocal}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                  />
                </div>

                <div>
                  <label className="block font-rounded-black text-sm font-medium text-gray-700 mb-1">Descripción</label>
                  <textarea
                    name="descripcion"
                    value={usuario.descripcion}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <label className="block font-rounded-black text-sm font-medium text-gray-700 mb-3">Foto de perfil</label>
              <SelectorFotoPerfil
                onSeleccionar={(url: string) =>
                  setUsuario((prev) => ({
                    ...prev,
                    fotoPerfil: url,
                  }))
                }
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Crear cuenta
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default UsuarioForm;