import type { NuevaPelicula, PeliculaEspecifica, Peliculas } from "../types/peliculas";
import type { APIError, APIResult } from "../types/util";

const baseURL: string = "http://localhost:8080";

export async function getAllPeliculas(): Promise<APIResult<Peliculas[]>> {
    const response = await fetch(`${baseURL}/peliculas/listarPeliculas`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    });
    if (response.ok) {
        const peliculas: Peliculas[] = await response.json();
        return {ok: true, data: peliculas};
    }
    const error: APIError = await response.json();
    return {ok: false, error: error};
}

export async function getOnePelicula(id: string): Promise<APIResult<PeliculaEspecifica>> {
    const response = await fetch(`${baseURL}/peliculas/verPelicula/${id}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    });
    if (response.ok) {
        const pelicula: PeliculaEspecifica = await response.json();
        return {ok: true, data: pelicula};
    }
    const error: APIError = await response.json();
    return {ok: false, error: error};
}

export async function crearPelicula(request: NuevaPelicula, archivo: File ): Promise<APIResult<NuevaPelicula>> {
    const formData = new FormData();

    formData.append('nombre', request.nombre);
    formData.append('portada', request.portada);
    formData.append('descripcion', request.descripcion);
    formData.append('director', request.director);
    formData.append('genero', request.genero);
    formData.append('valoracion', request.valoracion.toString());
    
    if (archivo) {
        formData.append('archivo', archivo);
    }

    const response = await fetch(`${baseURL}/peliculas/subirPelicula`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
        },
        body: formData,
    });
    if (response.ok) {
        const pelicula: NuevaPelicula = await response.json();
        return {ok: true, data: pelicula};
    }
    const error: APIError = await response.json();
    return {ok: false, error: error};
}

export async function editarPelicula(id: string, request: PeliculaEspecifica): Promise<APIResult<NuevaPelicula>> {
    const response = await fetch(`${baseURL}/peliculas/editarPelicula/${id}`, {
        method: 'PUT',
        body: JSON.stringify(request),
        headers: {
            'Accept': 'application/json',
        },
    });
    if (response.ok) {
        const pelicula: PeliculaEspecifica = await response.json();
        return {ok: true, data: pelicula};
    }
    const error: APIError = await response.json();
    return {ok: false, error: error};
}

export async function borrarPelicula(id: string): Promise<APIResult<PeliculaEspecifica>> {
    const response = await fetch(`${baseURL}/peliculas/eliminarPelicula/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
        },
    });
    if (response.ok) {
        const pelicula: PeliculaEspecifica = await response.json();
        return {ok: true, data: pelicula};
    }
    const error: APIError = await response.json();
    return {ok: false, error: error};
}

