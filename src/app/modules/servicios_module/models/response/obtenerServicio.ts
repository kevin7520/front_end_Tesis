import { Servicios } from "../servicio.mode"

export interface ObtenerServicios {
    codigo: string
    mensaje: string
    data: Servicios[]
}