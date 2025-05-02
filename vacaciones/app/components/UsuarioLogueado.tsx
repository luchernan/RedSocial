import React, { useState } from "react";
import { obtenerUsuarioLogueado } from "../services/api"; // Importamos el método
import type { Usuario } from "../interfaces/tipos"; // Asegúrate de importar la interfaz Usuario

const UsuarioLogueado = () => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [error, setError] = useState<string>("");

  const handleObtenerUsuario = async () => {
    try {
      const usuarioLogueado = await obtenerUsuarioLogueado();
      setUsuario(usuarioLogueado as Usuario);
      setError(""); // Limpiar error en caso de éxito
    } catch (error) {
      setError("No hay sesión activa o hubo un problema al obtener los datos");
      setUsuario(null); // Limpiar el estado de usuario
    }
  };

  return (
    <div>
      <button
        onClick={handleObtenerUsuario}
        className="p-2 bg-blue-500 text-white rounded"
      >
        Obtener Usuario Logueado
      </button>

      {usuario && (
        <div className="mt-4">
          <h2>Usuario Logueado</h2>
          <p><strong>Nombre:</strong> {usuario.nombre}</p>
          <p><strong>Email:</strong> {usuario.email}</p>
          <p><strong>Género:</strong> {usuario.genero}</p>
          <p><strong>Edad:</strong> {usuario.edad}</p>
          <p><strong>Idioma:</strong> {usuario.idioma}</p>
        </div>
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default UsuarioLogueado;
