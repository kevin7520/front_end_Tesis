import { EstadoServicioDto } from "../estadoServicio"

export interface EstadoServicioResponse {
    codigo: string
    mensaje: string
    data: EstadoServicioDto[]
}