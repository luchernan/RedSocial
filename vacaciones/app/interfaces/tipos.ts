export interface WikipediaThumbnail {
    source: string;
    width: number;
    height: number;
  }
  export interface WikipediaSummary {
    title: string;
    extract: string;
    image?: string; // Imagen de Pexels (o fallback)
  }

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
    fechaInicio: string; // o Date, si lo parseas luego
    fechaFin: string;    // o Date
    usuario: Usuario;
  }
  export interface Mensaje {
    id: number;
    remitente: Usuario; // Asumimos que la interfaz Usuario ya está definida
    destinatario: Usuario;
    contenido: string;
    fechaEnvio: string; // Podría ser un string que represente un datetime ISO 8601
    leido: boolean;
  }
  