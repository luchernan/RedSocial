
import DestinoMenu from "~/components/DestinoMenu";
import DestinoSearchBar from "~/components/DestinoSearchBar";
import FiltroUsuario from "~/components/FiltroUsuarios";
import Header from "~/components/Header";
import React, { useState, useMemo, useEffect } from "react";
import { useLoaderData, useOutletContext } from "react-router";

import { useNavigate } from "react-router";


const Inicio = () => {

return (
<div>
    <Header></Header>

<DestinoSearchBar />
      <h1 className="text-2xl font-bold text-center mt-4">Buscar Destino</h1>
      <FiltroUsuario />
      {/* <DestinoMenu /> */}
</div>

)
}

export default Inicio;