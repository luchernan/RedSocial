import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout("routes/home.tsx", [
        index("layout/loginscreen.tsx"), 
        route("usuario", "layout/usuario.tsx"),
        route("editarusuario", "layout/editarusuario.tsx"),
        route("infousuario", "layout/infousuario.tsx"),
        route("inicio", "layout/inicio.tsx"),
        route("chat:usuarioId", "layout/chat.tsx"),
        route("destinodetalle/:destinoId", "layout/destinodetalle.tsx"),

      ])
      
      
] satisfies RouteConfig;
