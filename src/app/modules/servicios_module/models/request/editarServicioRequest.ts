export interface EditarServicioRequest {
  idCliente: number
  idTecnico: number
  idTipoServicio: number
  idEstadoServicio: number
  fechaTentativaAtencion: string
  productos: DataProducto[]
}

export interface DataProducto {
  idProducto: number
  valor: number
  serie: string
}
