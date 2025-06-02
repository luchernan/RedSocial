import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";



// /routes.ts
export default [
    layout("routes/home.tsx", [
        index("layout/loginscreen.tsx"), 
        route("usuario", "layout/usuario.tsx"),
        route("editarusuario", "layout/editarusuario.tsx"),
        route("infousuario", "layout/infousuario.tsx"),
         route("misviajes", "layout/misviajes.tsx"),
        route("inicio", "layout/inicio.tsx"),
        route("contacto", "layout/contacto.tsx"),
        route("alldestinos", "layout/alldestinos.tsx"),
        route("detalleusuario/:id", "layout/detalleusuario.tsx"),
        route("destinodetalle/:destinoId", "layout/destinodetalle.tsx"),

      ])
      
      
] satisfies RouteConfig;
