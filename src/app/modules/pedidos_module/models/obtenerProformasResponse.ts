export interface ObtenerPedidosResponse {
    codigo: string
  mensaje: string
  data: PedidosData[]
}

export interface PedidosData {
  idPedido: number
  descripcionProducto: string
  subtotal: number
  iva: number
  total: number
  idCliente: number
  idEstadoPedido: number
  cliente: Cliente
  estadoPedido: EstadoPedido
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

export interface EstadoPedido {
  idEstadoPedido: number
  nombreEstadoPedido: string
}
