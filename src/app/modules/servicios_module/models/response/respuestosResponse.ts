import { Respuestos } from "../respuestos.model"

export interface RespuestasResponse {
  codigo: string
  mensaje: string
  data: Respuestos[]
}