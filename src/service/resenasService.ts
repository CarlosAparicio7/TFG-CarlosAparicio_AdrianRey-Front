import type { Resenas } from "../types/resenas";
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