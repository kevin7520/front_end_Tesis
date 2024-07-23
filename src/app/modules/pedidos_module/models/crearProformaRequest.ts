export interface CrearPedidoRequest {
  descripcionProducto: string
  subtotal: number
  iva: number
  total: number
  idCliente: number
  idEstadoPedido: number
  detalles: DetallePedido[]
}

export interface DetallePedido {
  idRepuesto: number
  cantidad: number
  descripcionRepuesto: string
  precioUnitario: number
  precioFinal: number
}
