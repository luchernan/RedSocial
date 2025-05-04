
import DestinoMenu from "~/components/DestinoMenu";
import DestinoSearchBar from "~/components/DestinoSearchBar";
import FiltroUsuario from "~/components/FiltroUsuarios";
import CrearViaje from "~/components/CrearViaje";
import ListaViajes from "~/components/ListaViajes";
import Header from "~/components/Header";
import React, { useState } from "react";
import { useLoaderData, useOutletContext } from "react-router";
import { useNavigate } from "react-router";
import type { Destino } from "../interfaces/tipos";

const Inicio = () => {
  const [destinoSeleccionado, setDestinoSeleccionado] = useState<Destino | null>(null);

  return (
    <div>
      <Header />

      {/* Buscar destino y actualizar el estado */}
      <DestinoSearchBar onDestinoSeleccionado={setDestinoSeleccionado} />

      {/* <h1 className="text-2xl font-bold text-center mt-4">Buscar Destino</h1> */}

      {/* Crear viaje solo si hay destino */}
      {destinoSeleccionado && <ListaViajes destino={destinoSeleccionado} />}
      {destinoSeleccionado && <CrearViaje destino={destinoSeleccionado} />}

      {/* <FiltroUsuario /> */}
      {/* <DestinoMenu /> */}
    </div>
  );
};

export default Inicio;
