import { Outlet } from "react-router";
import { useState } from "react";

import Footer from "~/components/Footer";

export default function Home() {
  const [search, setSearch] = useState<string>("");

  return (
<div className="min-h-screen flex flex-col justify-between">
  <main className="flex-grow">
    <Outlet />
  </main>
  <Footer />
</div>

  );
}

