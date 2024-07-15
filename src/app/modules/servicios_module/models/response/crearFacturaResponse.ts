import { Factura } from "../factura.model"

export interface FacturaResponse {
    codigo: string
    mensaje: string
    data: Factura
}