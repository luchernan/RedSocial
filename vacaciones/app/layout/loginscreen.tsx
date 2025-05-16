import Login from "~/components/Login";

import React, { useState, useMemo, useEffect } from "react";
import { useLoaderData, useOutletContext } from "react-router";
import Header from "~/components/Header";
import { useNavigate } from "react-router";


const Loginscreen = () => {

return (
<div>
<Header></Header>
<Login />

</div>

)
}

export default Loginscreen;