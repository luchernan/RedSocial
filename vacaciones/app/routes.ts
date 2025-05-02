import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout("routes/home.tsx", [
        index("layout/loginscreen.tsx"),
        route("usuario", "layout/usuario.tsx"),
        route("inicio", "layout/inicio.tsx"),
        route("loginscreen", "layout/loginscreen.tsx")
      ])
      
] satisfies RouteConfig;
