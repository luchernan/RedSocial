import type { Route } from "./+types/home";
import DestinoMenu from "~/components/DestinoMenu";
import DestinoSearchBar from "~/components/DestinoSearchBar";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <main>
      <DestinoSearchBar />
      <h1 className="text-2xl font-bold text-center mt-4">Buscar Destino</h1>
      <DestinoMenu />
    </main>
  );
}
