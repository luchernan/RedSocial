import Login from "~/components/Login";

import React, { useState, useMemo, useEffect } from "react";
import { useLoaderData, useOutletContext } from "react-router";

import { useNavigate } from "react-router";


const Loginscreen = () => {

return (
<div>

<Login />
</div>

)
}

export default Loginscreen;