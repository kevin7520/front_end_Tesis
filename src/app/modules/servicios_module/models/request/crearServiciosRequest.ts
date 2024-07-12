export interface CrearServiciosRequest {
        idCliente: number
        idTecnico: null
        idTipoServicio: number
        idEstadoServicio: number
        valor: number
        fechaTentativaAtencion: Date
        productos: []
}