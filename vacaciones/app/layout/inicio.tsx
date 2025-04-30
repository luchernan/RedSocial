
import DestinoMenu from "~/components/DestinoMenu";
import DestinoSearchBar from "~/components/DestinoSearchBar";
import FiltroUsuario from "~/components/FiltroUsuarios";
import React, { useState, useMemo, useEffect } from "react";
import { useLoaderData, useOutletContext } from "react-router";

import { useNavigate } from "react-router";


const Inicio = () => {
    const navigate = useNavigate();

return (
<div>
<div className="text-center mt-6">
      <button onClick={() => navigate("/usuario")} className="btn">
        Crear Usuario
      </button>
    </div>
<DestinoSearchBar />
      <h1 className="text-2xl font-bold text-center mt-4">Buscar Destino</h1>
      <FiltroUsuario />
      <DestinoMenu />
</div>

)
}

export default Inicio;