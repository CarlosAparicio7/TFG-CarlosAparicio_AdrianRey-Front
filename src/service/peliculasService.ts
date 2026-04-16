import type { Peliculas } from "../types/peliculas";
import type { APIError, APIResult } from "../types/util";

const baseURL: string = "http://localhost:8080";

export async function mostrarPeliculas(): Promise<APIResult<Peliculas[]>> {
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