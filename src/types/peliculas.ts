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
    archivoVideo: number
}

export type NuevaPelicula = {
    nombre: string,
    portada: string,
    descripcion: string,
    director: string,
    genero: string,
    archivoVideo: number
}