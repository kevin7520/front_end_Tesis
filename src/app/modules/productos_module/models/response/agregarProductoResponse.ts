export interface AgregarProductoResponse {
    codigo: string;
    mensaje: string;
    data: DataAgregarProductoResponse;
}

export interface DataAgregarProductoResponse {
    idProducto: number;
    nombreCategoria: string;
    codigoProducto: string;
    modelo: string;
    estado: string;
    serieProducto: string;
    precio: number;
}