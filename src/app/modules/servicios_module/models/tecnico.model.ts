export interface tecnicos {
  idTecnico: number
  nombreTecnico: string
  cedula: string
  telefonoTecnico: string
  estadoTecnico: EstadoTecnico
}

export interface EstadoTecnico {
  idEstado: number
  nombreEstado: string
}
