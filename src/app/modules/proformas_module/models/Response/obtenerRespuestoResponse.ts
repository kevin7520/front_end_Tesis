export interface respuestosProformaResponse {
    codigo: string
  mensaje: string
  data: detalleProformna[]
}

export interface detalleProformna {
  idDetalleProforma: number
  idProforma: number
  idRepuesto: number
  cantidad: number
  descripcionRepuesto: string
  precioUnitario: number
  precioFinal: number
  proforma: Proforma
  repuesto: Repuesto
}

export interface Proforma {
  idProforma: number
  descripcionProducto: string
  subtotal: number
  iva: number
  total: number
  idCliente: number
  idEstadoProforma: number
  cliente: any
  estadoProforma: any
}

export interface Repuesto {
  idRepuesto: number
  codigoRepuesto: string
  nombreRepuesto: string
  cantidad: number
  precio: number
}
