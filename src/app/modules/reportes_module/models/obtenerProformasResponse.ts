export interface ObtenerProformasResponse {
    codigo: string
  mensaje: string
  data: proformaData[]
}

export interface proformaData {
  idProforma: number
  descripcionProducto: string
  subtotal: number
  iva: number
  total: number
  idCliente: number
  idEstadoProforma: number
  cliente: Cliente
  estadoProforma: EstadoProforma
}

export interface Cliente {
  idCliente: number
  cedula: string
  nombres: string
  telefono: string
  direccion: string
  correo: string
  idCiudad: number
  ciudad: any
}

export interface EstadoProforma {
  idEstadoProforma: number
  nombreEstadoProforma: string
}
