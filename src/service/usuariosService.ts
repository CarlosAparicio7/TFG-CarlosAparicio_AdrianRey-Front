import type { LoginResponse, LoginUsuario, NuevoUsuario, RegistrarUsuario, UsuarioEspecifico, Usuarios } from "../types/usuarios";
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

export async function accesoLogin(request: LoginUsuario): Promise<APIResult<LoginResponse>> {
    const response = await fetch(`${baseURL}/usuarios/borrarUsuario/`, {
        method: 'POST',
        body: JSON.stringify(request),
        headers: {
            'Accept': 'application/json',
        },
    });
    if (response.ok) {
        const login: LoginResponse = await response.json();
        return {ok: true, data: login};
    }
    const error: APIError = await response.json();
    return {ok: false, error: error};
}

export async function registrarUsuario(request: RegistrarUsuario): Promise<APIResult<RegistrarUsuario>> {
    const response = await fetch(`${baseURL}/usuarios/crearSesion/`, {
        method: 'POST',
        body: JSON.stringify(request),
        headers: {
            'Accept': 'application/json',
        },
    });
    if (response.ok) {
        const registro: RegistrarUsuario = await response.json();
        return {ok: true, data: registro};
    }
    const error: APIError = await response.json();
    return {ok: false, error: error};
}