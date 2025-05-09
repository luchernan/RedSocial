import React, { useState, useMemo, useEffect } from "react";
import { useLoaderData, useOutletContext } from "react-router";

import { useNavigate } from "react-router";
import UsuarioLogueado from "~/components/UsuarioLogueado";
import Header from "~/components/Header";
import EditarPerfil from "~/components/EditarPerfil";


const Editarusuario = () => {

return (
<div>

 <Header></Header>
<EditarPerfil></EditarPerfil>

</div>

)
}

export default Editarusuario;