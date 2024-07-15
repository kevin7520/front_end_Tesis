import { Almacenes } from "../almacenes.model"

export interface AlmacenesResposne {
    codigo: string
    mensaje: string
    data: Almacenes[]
}