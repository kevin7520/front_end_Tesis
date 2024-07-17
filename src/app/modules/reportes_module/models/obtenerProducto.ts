import { Producto } from "./producto.model";

export interface ObtenerProductos {
    codigo: string;
    mensaje: string;
    data: Producto[];
}