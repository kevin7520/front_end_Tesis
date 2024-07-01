import { GeneralResponse } from "src/app/shared/models/generaResponse";

export interface LoginResponse {
    respuesta: GeneralResponse;
    token: string;
    idPersona: number;
    idRol: number;
}