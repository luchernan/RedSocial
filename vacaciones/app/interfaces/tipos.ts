
  export interface Destino {
    id: number;
    nombre: string;
    pais: string;
    descripcion: string;
    wikipediaSlug: string;
  }

  export interface Usuario {
    id?: number;
    email: string;
    password: string;
    fechaNacimiento: string;
    nombre: string;
    genero: 'hombre' | 'mujer' | 'otro';
    descripcion: string;
    instagram: string;
    tipoUsuario: 'local' | 'viajero';
    idioma: string;
    pais: 'España';
    ciudadLocal: string;
    fotoPerfil: string;
    edad?: number;
  }

  export interface Fotoperfil{
    id?: number;
    url: string;
  }
  export interface Comentario {
    id: number;
    contenido: string;
    usuarioId: number;
    viaje: Viaje;
  }
  export interface CrearComentarioDTO {
    contenido: string;
    usuarioId: number;
    viajeId: number;
  }
  

  export interface Viaje {
    id: number;
    usuarioId: number;
    destinoId: number;
    fechaInicio: string;
    fechaFin: string;    
    usuario: Usuario;
  }
  export interface ViajeMio {
    id: number;
    usuarioId: number;
    destino: Destino;
    fechaInicio: string; 
    fechaFin: string;    
    usuario: Usuario;
  }




  