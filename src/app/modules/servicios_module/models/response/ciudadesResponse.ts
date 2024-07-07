import { CiudadModel } from "../ciudad.model";

export interface CiudadesResponse {
    codigo: string;
    mensaje: string;
    data: CiudadModel[]
}