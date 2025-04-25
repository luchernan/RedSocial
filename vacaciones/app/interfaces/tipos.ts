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
  