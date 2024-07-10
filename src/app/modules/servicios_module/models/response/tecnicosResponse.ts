import { tecnicos } from "../tecnico.model"

export interface TecnicosResponse {
  codigo: string
  mensaje: string
  data: tecnicos[]
}