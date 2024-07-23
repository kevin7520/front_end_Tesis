export interface respuestosPedidoResponse {
    codigo: string
  mensaje: string
  data: detallePedido[]
}

export interface detallePedido {
  idDetallePedido: number
  idPedido: number
  idRepuesto: number
  cantidad: number
  descripcionRepuesto: string
  precioUnitario: number
  precioFinal: number
  pedido: Pedido
  repuesto: Repuesto
}

export interface Pedido {
  idPedido: number
  descripcionProducto: string
  subtotal: number
  iva: number
  total: number
  idCliente: number
  idEstadoPedido: number
  cliente: any
  estadoPedido: any
}

export interface Repuesto {
  idRepuesto: number
  codigoRepuesto: string
  nombreRepuesto: string
  cantidad: number
  precio: number
}
