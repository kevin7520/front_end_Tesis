import { Horario } from "../horario.model"

export interface HorarioResponse {
    codigo: string
    mensaje: string
    data: Horario[]
}