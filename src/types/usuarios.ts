export type createUser = {
    id: string;
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    avatarIcon: string;
    rol: string;
}

export type LoginUsuario = {
    email: string,
    password: string
}

export type Usuarios = {
    id: string,
    nombre: string,
    apellido: string,
    avatarIcon: string,
    rol: string,
    email: string,
    password: string
}