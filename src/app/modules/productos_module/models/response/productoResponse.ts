import { GeneralResponse } from "src/app/shared/models/generaResponse";

export interface ProductoResponse {
    respuesta: GeneralResponse;
    productos: ItemsResponse[];
}

export interface ItemsResponse {
    id_producto: number;
    categoria: string;
    codigo_producto: number;
    modelo: string;
    serie_producto: string;
    estado_producto: string;

}