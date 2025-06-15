import type { Destino, Usuario, Comentario, Fotoperfil,CrearComentarioDTO, Viaje } from "../interfaces/tipos";


const authHeader = 'Basic ' + btoa('lucas:lucas');


const PEXELS_API_KEY = "jOM9LGe1Ovq0jBkJ8SFdWUPfsatrFwR4lOdeX80Xq1jt96rXYSFoXdXx";

/*
 *
* Destinos
*  
*/

//Obtener todos los destinos
export async function getAllDestinos(): Promise<Destino[]> {
  const response = await fetch(`https://tfg-vacaciones-back-production.up.railway.app/viajes`, {

      headers: {
          Authorization: authHeader
      }
      }
  );
  if (!response.ok) {
    throw new Error("Error al obtener los destinos");
  }
  return await response.json();
}

//obtiene destino por Id
export async function getDestinoById(id: number): Promise<Destino> {
  const response = await fetch(`http://localhost:8586/viajes/${id}`, {

      headers: {
          Authorization: authHeader
        }
      }
  );
  if (!response.ok) {
      throw new Error(`Destino con ID ${id} no encontrado`);
  }
  return await response.json();
}

/*
*
* Viajes
*
* */

//Todos los viajes por Destino seleccionado
export const getViajesPorDestino = async (destinoId: number): Promise<Viaje[]> => {
  const res = await fetch(`http://localhost:8586/viajes/destino/${destinoId}`);
  if (!res.ok) {
    throw new Error("Error al obtener viajes");
  }
  return await res.json();
};

 // Elimina un viaje por su ID.
export async function deleteViajeById(viajeId: number): Promise<void> {
  const res = await fetch(`http://localhost:8586/viajes/viajes/${viajeId}`, {
    method: "DELETE",
    headers: {
      Authorization: authHeader,
    },
  });
  if (!res.ok) {
    throw new Error(`Error al eliminar viaje con ID ${viajeId}`);
  }
}

//crear viajes
export async function crearViaje(viaje: {
  usuarioId: number;
  destinoId: number;
  fechaInicio: string;
  fechaFin: string;
}): Promise<any> {
  try {
    const response = await fetch("http://localhost:8586/viajes/viajes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(viaje),
    });

    if (!response.ok) {
      throw new Error("Error al crear el viaje");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creando viaje:", error);
    throw error;
  }
}

//Obtiene todos los viajes que ha creado o comentado un usuario
export async function getViajesParticipadosIds(usuarioId: number): Promise<number[]> {
  const res = await fetch(`http://localhost:8586/viajes/usuarios/${usuarioId}/viajes-participados`, {
    headers: {
      Authorization: authHeader
    }
  });
  if (!res.ok) {
    throw new Error("Error al obtener IDs de viajes participados");
  }
  return res.json(); 
}

//obtiene viaje por un id
export async function getViajeById(viajeId: number): Promise<Viaje> {
  const res = await fetch(`http://localhost:8586/viajes/viajes/${viajeId}`, {
    headers: {
      Authorization: authHeader
    }
  });
  if (!res.ok) {
    throw new Error(`Error al obtener viaje con ID ${viajeId}`);
  }
  return res.json();
}
export async function getMisViajesParticipados(usuarioId: number): Promise<Viaje[]> {
  const ids = await getViajesParticipadosIds(usuarioId);
  const viajes = await Promise.all(ids.map((id) => getViajeById(id)));
  return viajes;
}


/*
*
* Comentarios
*
* */





// Obtener comentarios de un viaje
export async function getComentariosPorViaje(viajeId: number): Promise<Comentario[]> {
  const res = await fetch(`http://localhost:8586/viajes/viajes/${viajeId}/comentarios`);
  if (!res.ok) {
    throw new Error("Error al obtener comentarios");
  }
  return await res.json();
}

// Crear un nuevo comentario 
export async function crearComentario(comentario: CrearComentarioDTO): Promise<Comentario> {
  const res = await fetch(`http://localhost:8586/viajes/comentarios`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comentario),
  });
  if (!res.ok) {
    throw new Error("Error al crear comentario");
  }
  return await res.json();
}

// Eliminar comentario
export async function eliminarComentario(id: number): Promise<void> {
  const res = await fetch(`http://localhost:8586/viajes/comentarios/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Error al eliminar comentario");
  }
}


export async function getComentariosUsuario(usuarioId: number): Promise<Comentario[]> {
  const res = await fetch(`http://localhost:8586/viajes/usuarios/${usuarioId}/comentarios`);
  if (!res.ok) throw new Error("Error al obtener comentarios de usuario");
  return res.json();
}
  



/*
 *
* Usuarios
*  
*/

export async function login(email: string, password: string) {
    const response = await fetch("http://localhost:8586/viajes/login", {
      method: "POST",
      credentials: "include", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
  
    if (!response.ok) {
      throw new Error("Credenciales incorrectas");
    }
  
    return response.json();
  }

  //obtiene un usuario por su Id
  export async function getUsuarioPorId(id: number): Promise<Usuario> {
    const res = await fetch(`http://localhost:8586/viajes/usuarios/${id}`);
    if (!res.ok) {
      throw new Error("Error al obtener usuario");
    }
    return await res.json();
  }

  //Se usa al editar un Usuario
  export async function actualizarUsuario(id: number, usuarioActualizado: Partial<Usuario>): Promise<Usuario> {
    try {
      const response = await fetch(`http://localhost:8586/viajes/usuarios/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuarioActualizado),
      });
  
      if (!response.ok) {
        throw new Error("Error al actualizar el usuario");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error actualizando usuario:", error);
      throw error;
    }
  }


  //crea un usuario
export async function crearUsuario(usuario: Usuario): Promise<Usuario> {
  try {
    const response = await fetch("http://localhost:8586/viajes/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });

    if (!response.ok) {
      throw new Error("Error al crear el usuario");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creando usuario:", error);
    throw error;
  }
}






// Función para obtener los usuarios filtrados
    export async function obtenerUsuariosFiltrados(
        genero?: string,
        edadMinima?: number,
        edadMaxima?: number,
        idioma?: string
    ): Promise<Usuario[]> {
        try {
        const response = await fetch("http://localhost:8586/viajes/usuarios/filtrar"); 
    
        if (!response.ok) {
            throw new Error("Error al obtener los usuarios");
        }
    
        const usuarios: Usuario[] = await response.json();
    
        return usuarios.filter((usuario) => {
            const cumpleGenero = genero ? usuario.genero === genero : true;
            const cumpleIdioma = idioma ? usuario.idioma === idioma : true;
            const cumpleEdad =
            usuario.edad !== undefined &&
            (edadMinima === undefined || usuario.edad >= edadMinima) &&
            (edadMaxima === undefined || usuario.edad <= edadMaxima);
    
            return cumpleGenero && cumpleIdioma && cumpleEdad;
        });
        } catch (error) {
        console.error("Error:", error);
        return [];
        }
    }
  


  // obtiene el usuario activo de la sesión
  export async function obtenerUsuarioLogueado(): Promise<Usuario> {
    try {
      const response = await fetch("http://localhost:8586/viajes/usuario-logueado", {
        method: "GET",
        credentials: "include", 
      });
  
      if (!response.ok) {
        throw new Error("No hay sesión activa o error al obtener el usuario");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error obteniendo el usuario logueado:", error);
      throw error;
    }
  }
  
  
  export async function logout() {
    await fetch("http://localhost:8586/viajes/logout", {
      method: "POST",
      credentials: "include",
    });
  }
  
  //obtiene las foto de perfil para crear o editar un usuario
  export async function obtenerFotosPerfil(): Promise<Fotoperfil[]> {
    try {
      const response = await fetch("http://localhost:8586/viajes/fotoperfil");
      if (!response.ok) {
        throw new Error("Error al obtener las fotos de perfil");
      }
      return await response.json();
    } catch (error) {
      console.error("Error al obtener las fotos de perfil:", error);
      throw error;
    }
  }

    

  //imagenes de los destinos
  export async function getImagenPexels(ciudad: string): Promise<string | null> {
    try {
      const res = await fetch(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(ciudad)}&per_page=10`,
        {
          headers: {
            Authorization: PEXELS_API_KEY,
          },
        }
      );
      const data = await res.json();
      const fotos = data.photos;
      if (fotos && fotos.length > 0) {
        const aleatoria = fotos[Math.floor(Math.random() * fotos.length)];
        return aleatoria?.src?.landscape || null;
      }
      return null;
    } catch (err) {
      console.error("Error al obtener imagen de Pexels:", err);
      return null;
    }
  }
    