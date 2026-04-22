import type { NuevaResena, ResenaEspecifica, Resenas } from "../types/resenas";
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
    const response = await fetch(`${baseURL}/resenas/crearResena`, {
        method: 'POST',
        body: JSON.stringify(request),
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
    const response = await fetch(`${baseURL}/resenas/actualizarResena/${id}`, {
        method: 'PUT',
        body: JSON.stringify(request),
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

export async function borrarResena(id: string): Promise<APIResult<ResenaEspecifica>> {
    const response = await fetch(`${baseURL}/resenas/borrarResena/${id}`, {
        method: 'DELETE',
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