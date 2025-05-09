import type { WikipediaSummary,WikipediaThumbnail ,Destino, Usuario, Fotoperfil, Viaje } from "../interfaces/tipos";


const authHeader = 'Basic ' + btoa('user:1b4336a9-3cc1-4660-b7b6-aa364b34828b');


const PEXELS_API_KEY = "jOM9LGe1Ovq0jBkJ8SFdWUPfsatrFwR4lOdeX80Xq1jt96rXYSFoXdXx";

export async function obtenerViajesFiltradosPorUsuarios(
    genero?: string,
    edadMinima?: number,
    edadMaxima?: number,
    idioma?: string
  ): Promise<Viaje[]> {
    try {
      const usuarios = await obtenerUsuariosFiltrados(genero, edadMinima, edadMaxima, idioma);
  
      const idsUsuarios = usuarios.map(u => u.id);
  
      const response = await fetch("http://localhost:8586/viajes"); // Ajusta si tienes otro endpoint
  
      if (!response.ok) {
        throw new Error("Error al obtener los viajes");
      }
  
      const viajes: Viaje[] = await response.json();
  
      return viajes.filter(viaje => idsUsuarios.includes(viaje.usuario.id));
    } catch (error) {
      console.error("Error:", error);
      return [];
    }
  }
  


export const getViajesPorDestino = async (destinoId: number): Promise<Viaje[]> => {
  const res = await fetch(`http://localhost:8586/viajes/destino/${destinoId}`);
  if (!res.ok) {
    throw new Error("Error al obtener viajes");
  }
  return await res.json();
};




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

export async function obtenerUsuarioLogueado(): Promise<Usuario> {
    try {
      const response = await fetch("http://localhost:8586/viajes/usuario-logueado", {
        method: "GET",
        credentials: "include", // Incluir cookies de sesión
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
  



/**
 * Obtener un destino por ID
*/
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

/**
 * Obtener todos los destinos
 */
export async function getAllDestinos(): Promise<Destino[]> {
    const response = await fetch(`http://localhost:8586/viajes`, {

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
  
  export async function getUsuarioLogueado() {
    const response = await fetch("http://localhost:8586/viajes/usuario-logueado", {
      credentials: "include",
    });
  
    if (!response.ok) {
      throw new Error("No hay sesión activa");
    }
  
    return response.json();
  }
  
  export async function logout() {
    await fetch("http://localhost:8586/viajes/logout", {
      method: "POST",
      credentials: "include",
    });
  }
  
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


    
    // export async function obtenerResumenCiudad(ciudad: string): Promise<WikipediaSummary | null> {
    //   try {
    //     // 1. Obtener resumen de Wikipedia
    //     const wikiRes = await fetch(
    //       `https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(ciudad)}`
    //     );
    
    //     if (!wikiRes.ok) throw new Error("No se pudo obtener resumen");
    
    //     const wikiData = await wikiRes.json();
    
    
    //     // 2. Obtener 10 imágenes desde Pexels
    //     const pexelsRes = await fetch(
    //       `https://api.pexels.com/v1/search?query=${encodeURIComponent(ciudad)}&per_page=10`,
    //       {
    //         headers: {
    //           Authorization: PEXELS_API_KEY,
    //         },
    //       }
    //     );
    
    //     const pexelsData = await pexelsRes.json();
    //     const fotos = pexelsData.photos;
    
    //     let image: string | undefined;
    
    //     if (fotos && fotos.length > 0) {
    //       const aleatoria = fotos[Math.floor(Math.random() * fotos.length)];
    //       image = aleatoria?.src?.landscape;
    //     }
    
    //     return {
    //       title: wikiData.title,
    //       extract: wikiData.extract,
    //       image,
    //     };
    //   } catch (error) {
    //     console.error("Error al obtener datos:", error);
    //     return null;
    //   }
    // }