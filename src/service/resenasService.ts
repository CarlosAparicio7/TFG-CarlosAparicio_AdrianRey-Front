import type { NuevaResena, Resenas, ResenaEspecifica } from "../types/resenas";
import type { APIError, APIResult } from "../types/util";

const baseURL: string = "http://localhost:8080";

export async function mostrarResenas(): Promise<APIResult<Resenas[]>> {
    const response = await fetch(`${baseURL}/resenas/listarResenas`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    });
    if (response.ok) {
        const resenas: Resenas[] = await response.json();
        return {ok: true, data: resenas};
    }
    const error: APIError = await response.json();
    return {ok: false, error: error};
}

export async function crearResena(request: NuevaResena): Promise<APIResult<NuevaResena>> {
    const formData = new FormData();
    formData.append('comentario', request.comentario);
    formData.append('numeroEstrellas', request.numeroEstrellas.toString());
    formData.append('peliculaId', request.peliculaId);
    formData.append('usuarioId', request.usuarioId);

    const response = await fetch(`${baseURL}/resenas/crearResena`, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json',
        },
    });

    if (response.ok) {
        const resena: NuevaResena = await response.json();
        return {ok: true, data: resena};
    }
    const error: APIError = await response.json();
    return {ok: false, error: error};
}

export async function editarResena(id: string, request: ResenaEspecifica): Promise<APIResult<ResenaEspecifica>> {
    const params = new URLSearchParams();
    params.append('comentario', request.comentario);
    params.append('numeroEstrellas', request.numeroEstrellas.toString());

    const response = await fetch(`${baseURL}/resenas/actualizarResena/${id}?${params.toString()}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
        },
    });

    if (response.ok) {
        const resena: ResenaEspecifica = await response.json();
        return {ok: true, data: resena};
    }
    const error: APIError = await response.json();
    return {ok: false, error: error};
}

export async function borrarResena(id: string): Promise<APIResult<string>> {
    const response = await fetch(`${baseURL}/resenas/borrarResena/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
        },
    });
    if (response.ok) {
        return {ok: true, data: id};
    }
    const error: APIError = await response.json();
    return {ok: false, error: error};
}