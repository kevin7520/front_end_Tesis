import { GeneralResponse } from "src/app/shared/models/generaResponse";

export interface ProductoResponse {
    codigo: string;
    mensaje: string;
    data: ItemsResponse[];
}

export interface ItemsResponse {
    idProducto: number;
    idCategoria: number;
    nombreCategoria: string;
    codigoProducto: number;
    modelo: string;
    serieProducto: string;
    estado: string;
    precio: number;
    idEstadoProducto: number;
    categoria: {
        idCategoria: number;
        nombreCategoria: string;
    },
    estadoProducto: {
        idEstadoProducto: number;
        nombreEstadoProducto: string;
    }
}