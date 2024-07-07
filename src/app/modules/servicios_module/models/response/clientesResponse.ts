import { ClienteModel } from "../cliente.model"

export interface ClientesResponseResponse {
    codigo: string
    mensaje: string
    data: ClienteModel[]
}