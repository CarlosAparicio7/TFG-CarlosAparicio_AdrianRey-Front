export type APIError = {
    detalle:string;
}
export type APIResult<T, E = APIError> =  | {ok: true, data?: T} | {ok: false, error: E};