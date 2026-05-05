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

export async function crearPelicula(request: NuevaPelicula, archivo: File | null): Promise<APIResult<NuevaPelicula>> {
    const formData = new FormData();

    formData.append('nombre', request.nombre);
    formData.append('portada', request.portada);
    formData.append('descripcion', request.descripcion);
    formData.append('director', request.director);
    formData.append('genero', request.genero);
    formData.append('valoracion', request.valoracion.toString());
    formData.append('urlVideo', request.urlVideo);
    
    if (archivo) {
        formData.append('archivo', archivo);
    }

    const response = await fetch(`${baseURL}/peliculas/subirPelicula`, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json',
        },
    });
    if (response.ok) {
        const pelicula: NuevaPelicula = await response.json();
        return {ok: true, data: pelicula};
    }
    const error: APIError = await response.json();
    return {ok: false, error: error};
}

export async function editarPelicula(id: string, request: PeliculaEspecifica, archivo: File | null): Promise<APIResult<NuevaPelicula>> {
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
    
    const response = await fetch(`${baseURL}/peliculas/editarPelicula/${id}`, {
        method: 'PUT',
        body: formData,
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
    const response = await fetch(`${baseURL}/peliculas/eliminar/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
        },
    });
    if (response.ok) {
        const data = response.status !== 204 ? await response.json() : null;
        
        return { ok: true, data: data };
    }
    const errorData = await response.json().catch(() => ({ 
        detail: "Error al intentar eliminar la película" 
    }));

    return { ok: false, error: errorData };
}

