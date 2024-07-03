export interface EditarProductoResponse {
    codigo: string;
    mensaje: string;
    data: DataProductoResponse;
}

export interface DataProductoResponse {
    idProducto: number;
    nombreCategoria: string;
    codigoProducto: string;
    modelo: string;
    estado: string;
    serieProducto: string;
    precio: number;
}