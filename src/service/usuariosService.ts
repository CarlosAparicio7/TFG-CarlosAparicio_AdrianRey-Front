import type { NuevoUsuario, UsuarioEspecifico, Usuarios } from "../types/usuarios";
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

export async function crearUsuario(request: NuevoUsuario): Promise<APIResult<NuevoUsuario>> {
    const response = await fetch(`${baseURL}/usuarios/crearUsuario`, {
        method: 'POST',
        body: JSON.stringify(request),
        headers: {
            'Accept': 'application/json',
        },
    });
    if (response.ok) {
        const usuario: NuevoUsuario = await response.json();
        return {ok: true, data: usuario};
    }
    const error: APIError = await response.json();
    return {ok: false, error: error};
}

export async function editarUsuario(id: string, request: UsuarioEspecifico): Promise<APIResult<NuevoUsuario>> {
    const response = await fetch(`${baseURL}/usuarios/actualizarUsuario/${id}`, {
        method: 'PUT',
        body: JSON.stringify(request),
        headers: {
            'Accept': 'application/json',
        },
    });
    if (response.ok) {
        const usuario: UsuarioEspecifico = await response.json();
        return {ok: true, data: usuario};
    }
    const error: APIError = await response.json();
    return {ok: false, error: error};
}

export async function borrarUsuario(id: string): Promise<APIResult<UsuarioEspecifico>> {
    const response = await fetch(`${baseURL}/usuarios/borrarUsuario/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
        },
    });
    if (response.ok) {
        const usuario: UsuarioEspecifico = await response.json();
        return {ok: true, data: usuario};
    }
    const error: APIError = await response.json();
    return {ok: false, error: error};
}