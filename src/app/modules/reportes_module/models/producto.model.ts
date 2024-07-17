export interface Producto {
  idProducto: number;
  idCategoria: number;
  nombreCategoria: string;
  codigoProducto: number;
  modelo: string;
  serieProducto: string;
  estado: string;
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