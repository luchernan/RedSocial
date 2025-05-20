import { Outlet } from "react-router";
import { useState } from "react";

import Footer from "~/components/Footer";


export default function Home() {
  const [search, setSearch] = useState<string>("");

  return (
<div>


    <Outlet /> 

  

    <Footer></Footer>

  
</div>
);
}
