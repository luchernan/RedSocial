import type { WikipediaSummary,WikipediaThumbnail ,Destino } from "../interfaces/tipos";


const authHeader = 'Basic ' + btoa('user:d06d56c3-b563-45ce-b63d-7f13a75ac86b');


const PEXELS_API_KEY = "jOM9LGe1Ovq0jBkJ8SFdWUPfsatrFwR4lOdeX80Xq1jt96rXYSFoXdXx";




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





export async function obtenerResumenCiudad(ciudad: string): Promise<WikipediaSummary | null> {
  try {
    // 1. Obtener resumen de Wikipedia
    const wikiRes = await fetch(
      `https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(ciudad)}`
    );

    if (!wikiRes.ok) throw new Error("No se pudo obtener resumen");

    const wikiData = await wikiRes.json();



    // 2. Obtener 10 imágenes desde Pexels
    const pexelsRes = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(ciudad)}&per_page=10`,
      {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
      }
    );

    const pexelsData = await pexelsRes.json();
    const fotos = pexelsData.photos;

    let image: string | undefined;

    if (fotos && fotos.length > 0) {
      const aleatoria = fotos[Math.floor(Math.random() * fotos.length)];
      image = aleatoria?.src?.landscape;
    }

    return {
      title: wikiData.title,
      extract: wikiData.extract,
      image,
    };
  } catch (error) {
    console.error("Error al obtener datos:", error);
    return null;
  }
}


  
// export async function obtenerTodosDestinos(estacionId: number): Promise<EstacionImage | null> {
//     try {
    //         const res = await fetch(`http://localhost:8589/esqui/imagenes/${encodeURIComponent(estacionId)}`, {
        //             headers: {
//               Authorization: authHeader
//             }
//           });
          

//       if (!res.ok) throw new Error("No se pudo obtener la imagen de la estación");

//       const imagenes: EstacionImage[] = await res.json();

//       if (imagenes.length === 0) return null;

//       // Elegimos una imagen aleatoria
//       const imagenAleatoria = imagenes[Math.floor(Math.random() * imagenes.length)];

//       return imagenAleatoria;
//     } catch (error) {
//       console.error("Error al obtener imagen de estación:", error);
//       return null;
//     }
//   }
