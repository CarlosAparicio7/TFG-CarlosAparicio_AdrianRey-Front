import { useState } from "react";

type verPeliculas = {
    id: number,
    nombre: string,
    descripcion: string,
    valoracion: number,
    archivoVideo: number
}

export default function Home() {
    const[usePeliculas, setPeliculas] = useState<verPeliculas[]>([]);
    return (
        <></>
    );
}