export interface CrearHorarioResponse {
  codigo: string
  mensaje: string
  data: DataHorario

}

export interface DataHorario {
  idHorario: number
  idTecnico: number
  fecha: Date
  horaInicio: string
  horaFin: string
  tecnico: any
}