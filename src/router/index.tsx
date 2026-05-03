import { createBrowserRouter } from "react-router-dom";
import EditarPelicula from "../pages/EditarPelicula";
import Home from "../pages/Home";
import Login from "../pages/Login";
import PageNotFound from "../pages/PageNotFound";
import PeliculaEspecifica from "../pages/PeliculaEspecifica";
import Register from "../pages/Register";
import Settings from "../pages/Settings";
import SubirPelicula from "../pages/SubirPelicula";

export const router = createBrowserRouter([
    {path: "*", element: <PageNotFound/>},
    {path: "/", element: <Home/>},
    {path: "/login", element: <Login/>},
    {path: "/register", element: <Register/>},
    {path: "/pelicula/:id", element: <PeliculaEspecifica/>},
    {path: "/subirPelicula", element: <SubirPelicula/>},
    {path: "/editarPelicula/:id", element: <EditarPelicula/>},
    {path: "/settings", element: <Settings/>}
])