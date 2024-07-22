export interface CrearProformaRequest {
  descripcionProducto: string
  subtotal: number
  iva: number
  total: number
  idCliente: number
  idEstadoProforma: number
  detalles: DetalleProforma[]
}

export interface DetalleProforma {
  idRepuesto: number
  cantidad: number
  descripcionRepuesto: string
  precioUnitario: number
  precioFinal: number
}
