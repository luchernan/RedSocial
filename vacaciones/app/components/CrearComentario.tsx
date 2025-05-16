import { useState } from "react";
import { crearComentario } from "../services/api";
import type { Usuario } from "../interfaces/tipos";

type Props = {
  viajeId: number;
  usuario: Usuario;
};

const CrearComentario: React.FC<Props> = ({ viajeId, usuario }) => {
  const [mostrarInput, setMostrarInput] = useState(false);
  const [comentario, setComentario] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const handleEnviarComentario = async () => {
    if (!comentario.trim() || !usuario?.id || !viajeId) return;

    try {
      setEnviando(true);

      await crearComentario({
        contenido: comentario,
        usuarioId: usuario.id,
        viajeId: viajeId,
      });

      setComentario("");
      setEnviado(true);
      setTimeout(() => setEnviado(false), 2000);
    } catch (error) {
      console.error("Error al enviar comentario:", error);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="mt-4">
      {!mostrarInput ? (
        <button
          onClick={() => setMostrarInput(true)}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white py-2.5 px-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300" >
           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
          Añadir comentario
        </button>
      ) : (
        <div className="flex flex-col gap-2 mt-2">
          <textarea
            className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            placeholder="Escribe tu comentario..."
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            rows={2}
          />
          <button
            onClick={handleEnviarComentario}
            disabled={enviando || !comentario.trim()}
            className="self-end bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {enviando ? "Enviando..." : "Enviar"}
          </button>
          {enviado && (
            <span className="text-green-600 text-xs">Comentario enviado ✅</span>
          )}
        </div>
      )}
    </div>
  );
};

export default CrearComentario;
