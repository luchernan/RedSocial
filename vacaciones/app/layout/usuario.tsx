import { useState } from "react";
import { crearUsuario } from "../services/api";
import type { Usuario } from "../interfaces/tipos";
import { useNavigate } from "react-router";

const UsuarioForm = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState<Usuario>({
    email: "",
    password: "",
    fechaNacimiento: "",
    nombre: "",
    genero: "otro",
    descripcion: "",
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
  
    // Aseguramos el formato correcto de fechaNacimiento
    const fecha = usuario.fechaNacimiento;
    let fechaFormateada = fecha;
  
    if (fecha.includes("/")) {
      // Si viene como DD/MM/YYYY, la convertimos
      const [dia, mes, anio] = fecha.split("/");
      fechaFormateada = `${anio}-${mes.padStart(2, "0")}-${dia.padStart(2, "0")}`;
    }
  
    const usuarioFinal = {
      ...usuario,
      fechaNacimiento: fechaFormateada,
      fotoPerfil: usuario.fotoPerfil || "https://via.placeholder.com/150" // ✅ Valor por defecto
   
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
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Crear Usuario</h1>
      <input type="email" name="email" placeholder="Email" required value={usuario.email} onChange={handleChange} className="input" />
      <input type="password" name="password" placeholder="Contraseña" required value={usuario.password} onChange={handleChange} className="input" />
      <input type="date" name="fechaNacimiento" value={usuario.fechaNacimiento} onChange={handleChange} className="input" />
      <input type="text" name="nombre" placeholder="Nombre" required value={usuario.nombre} onChange={handleChange} className="input" />
      <select name="genero" value={usuario.genero} onChange={handleChange} className="input">
        <option value="hombre">Hombre</option>
        <option value="mujer">Mujer</option>
        <option value="otro">Otro</option>
      </select>
      <textarea name="descripcion" placeholder="Descripción" value={usuario.descripcion} onChange={handleChange} className="input" />
      <select name="tipoUsuario" value={usuario.tipoUsuario} onChange={handleChange} className="input">
        <option value="local">Local</option>
        <option value="viajero">Viajero</option>
      </select>
      <input type="text" name="idioma" placeholder="Idioma" value={usuario.idioma} onChange={handleChange} className="input" />
      <select name="pais" value={usuario.pais} disabled className="input">
        <option value="España">España</option>
      </select>
      <input type="text" name="ciudadLocal" placeholder="Ciudad" value={usuario.ciudadLocal} onChange={handleChange} className="input" />
      <input type="text" name="fotoPerfil" placeholder="URL Foto Perfil" value={usuario.fotoPerfil} onChange={handleChange} className="input" />
      <button type="submit" className="btn">Crear Usuario</button>
    </form>
  );
};

export default UsuarioForm;