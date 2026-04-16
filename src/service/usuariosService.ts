import type { Usuarios } from "../types/usuarios";
import type { APIError, APIResult } from "../types/util";

const baseURL: string = "http://localhost:8080";

export async function mostrarUsuarios(): Promise<APIResult<Usuarios[]>> {
    const response = await fetch(`${baseURL}/usuarios/listarUsuarios`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    });
    if (response.ok) {
        const usuarios: Usuarios[] = await response.json();
        return {ok: true, data: usuarios};
    }
    const error: APIError = await response.json();
    return {ok: false, error: error};
}