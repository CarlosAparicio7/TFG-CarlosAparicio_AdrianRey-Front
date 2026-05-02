export type Peliculas = {
    id: string,
    nombre: string,
    portada: string,
    descripcion: string,
    director: string,
    genero: string,
    valoracion: number
}

export type PeliculaEspecifica = {
    id: string,
    nombre: string,
    portada: string,
    descripcion: string,
    director: string,
    genero: string,
    valoracion: number,
    urlVideo: string
}

export type NuevaPelicula = {
    nombre: string,
    portada: string,
    descripcion: string,
    director: string,
    genero: string,
    valoracion: number,
    urlVideo: string
}