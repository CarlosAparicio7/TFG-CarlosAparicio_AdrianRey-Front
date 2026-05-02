import type { LoginUsuario, Usuarios } from "../types/usuarios";
import type { APIError, APIResult } from "../types/util";

const baseURL: string = "http://localhost:8080";

export async function accesoLogin(request: LoginUsuario): Promise<APIResult<Usuarios>> {
    const response = await fetch(`${baseURL}/usuarios/iniciarSesion`, {
        method: 'POST',
        body: JSON.stringify(request),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });

    if (response.ok) {
        const data: Usuarios = await response.json();
        return { ok: true, data: data };
    }
    
    const error: APIError = await response.json();
    return {ok: false, error: error};
}