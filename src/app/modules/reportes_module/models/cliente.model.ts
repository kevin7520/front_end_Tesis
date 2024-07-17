import { CiudadModel } from "./ciudad.model"

export interface ClienteModel {
    idCliente: number
    cedula: string
    nombres: string
    telefono: string
    direccion: string
    correo: string
    idCiudad: number
    ciudad: CiudadModel
}