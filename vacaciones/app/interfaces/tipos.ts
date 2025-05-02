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
  