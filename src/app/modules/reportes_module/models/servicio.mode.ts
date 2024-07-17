import { ClienteModel } from "./cliente.model"
import { EstadoServicioDto } from "./estadoServicio"
import { Horario } from "./horario.model"
import { Producto } from "./producto.model"
import { tecnicos } from "./tecnico.model"
import { TipoServicio } from "./tipoServicio.model"

export interface Servicios {
  idServicio: number
  cliente: ClienteModel
  tipoServicio: TipoServicio
  productos: Producto[]
  repuestos: any[]
  fechaSolicitudServicio: string
  fechaTentativaAtencion: string
  tecnico?: tecnicos
  almacen: any
  factura: any
  estadoServicioDto: EstadoServicioDto
  horarios: Horario[]
  valor: number
}