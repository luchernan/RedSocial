
import ListaViajes from "~/components/ListaViajes";
import Header from "~/components/Header";
import React, { useState } from "react";
import { useLoaderData, useOutletContext } from "react-router";
import { useNavigate } from "react-router";
import type { Destino, Viaje } from "../interfaces/tipos";
import CrearViaje from "~/components/CrearViaje";
import DestinoSearchBar from "~/components/DestinoSearchBar";
import FiltroViajesPorUsuario from "~/components/FiltroViajesPorUsuario"; // Asegúrate de importar

const Inicio = () => {
  const [destinoSeleccionado, setDestinoSeleccionado] = useState<Destino | null>(null);
  const [viajesDestino, setViajesDestino] = useState<Viaje[]>([]);

  return (
    <div>
      <Header />

      <DestinoSearchBar onDestinoSeleccionado={setDestinoSeleccionado} />

      {destinoSeleccionado && (
        <>
          <FiltroViajesPorUsuario viajes={viajesDestino} />
          <ListaViajes destino={destinoSeleccionado} onViajesCargados={setViajesDestino} />
          <CrearViaje destino={destinoSeleccionado} />
        </>
      )}
    </div>
  );
};

export default Inicio;

