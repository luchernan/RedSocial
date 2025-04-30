import { Outlet } from "react-router";
import { useState } from "react";

export default function Home() {
  const [search, setSearch] = useState<string>("");

  return (
    <Outlet /> // Aquí se cargará `inicio.tsx` automáticamente
  );
}
