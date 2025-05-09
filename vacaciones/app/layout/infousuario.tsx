import React, { useState, useMemo, useEffect } from "react";
import { useLoaderData, useOutletContext } from "react-router";

import { useNavigate } from "react-router";
import UsuarioLogueado from "~/components/UsuarioLogueado";
import Header from "~/components/Header";


const Infousuario = () => {

return (
<div>

 <Header></Header>
<UsuarioLogueado />

</div>

)
}

export default Infousuario;