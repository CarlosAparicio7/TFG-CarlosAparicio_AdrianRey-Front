import type { PeliculaResena } from "./peliculas";
import type { usuarioResena } from "./usuarios";

export type Resenas = {
    id: string,
    comentario: string,
    numeroEstrellas: number,
    usuario: usuarioResena,
    pelicula: PeliculaResena,
}

export type ResenaEspecifica = {
    id: string;
    comentario: string;
    numeroEstrellas: number;
}

export type NuevaResena = {
    comentario: string,
    numeroEstrellas: number,
    usuarioId: string,
    peliculaId: string
}