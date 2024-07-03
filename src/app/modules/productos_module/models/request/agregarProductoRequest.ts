export interface agregarProductoRequest {
    idCategoria: number,
    codigoProducto: string,
    modelo: string,
    idEstadoProducto: number,
    serieProducto: string,
    precio: number;
    categoria: {
        idCategoria: number;
        nombreCategoria: string;
    },
    estadoProducto: {
        idEstadoProducto: number;
        nombreEstadoProducto: string;
  }
}