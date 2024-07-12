export interface EditarServicioRequest {
  idCliente: number
  idTecnico: number
  idTipoServicio: number
  idEstadoServicio: number
  fechaTentativaAtencion: string,
  valor: number,
  productos: DataProducto[]
  repuestoDto: DataRepuesto[]
}

export interface DataProducto {
  idProducto: number
  valor: number
  serie: string
}

export interface DataRepuesto {
  idRepuesto: number;
}
