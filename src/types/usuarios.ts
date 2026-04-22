export type Usuarios = {
    id: number,
    nombre: string,
    apellido: string,
    avatarIcon: string,
    rol: string,
    email: string,
    password: string
}

export type UsuarioEspecifico = {
    id: number,
    nombre: string,
    apellido: string,
    avatarIcon: string,
    rol: string
}

export type NuevoUsuario = {
    nombre: string,
    apellido: string,
    avatarIcon: string,
    rol: string
}

export type LoginUsuario = {
    email: string,
    password: string
}

export type LoginResponse = {
    accessToken: string
}

export type RegistrarUsuario = {
    nombre: string,
    apellido: string,
    email: string,
    password: string
}