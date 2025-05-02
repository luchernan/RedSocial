import React, { useState } from "react";
import { login } from "../services/api";
import { useNavigate } from "react-router";

const Login = () => {
    const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const usuario = await login(email, password);
      console.log("Usuario logueado:", usuario);
      navigate("/inicio");
    } catch (error) {
      alert("Credenciales incorrectas");
    }
  };

  return (
<div>
<button onClick={() => navigate("/usuario")} className="btn">
    Crear Usuario
  </button>
    <form onSubmit={handleLogin} className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="p-2 border rounded w-full"
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="p-2 border rounded w-full"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
        Iniciar sesión
      </button>
    </form>
</div>

   
  );
};

export default Login;
