import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout("routes/home.tsx", [
        index("layout/inicio.tsx"),
        route("usuario", "layout/usuario.tsx")
      ])
      
] satisfies RouteConfig;
