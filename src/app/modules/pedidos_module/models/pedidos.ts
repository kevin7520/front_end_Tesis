export interface ResponseGlobal<T> {
    codigo: string;
    mensaje: string;
    data: T;
}

export interface CreatePedido {
    idCliente: number;
    tipoPedido: string;
    fechaPedido: Date;
    idProducto: number;
    detalles: CreateDetallePedido[];
}

export interface UpdatePedido {
    idPedido: number;
    idCliente: number;
    tipoPedido: string;
    fechaPedido: Date;
    idProducto: number;
    detalles: UpdateDetallePedido[];
}

export interface Pedido {
    idPedido: number;
    idCliente: number;
    cliente: Cliente;
    tipoPedido: string;
    fechaPedido: Date;
    idProducto: number;
    producto: Producto;
    detalles: DetallePedido[];
}

export interface Cliente {
    idCliente: number;
    cedula: string;
    nombres: string;
    telefono: string;
    direccion: string;
    correo: string;
    ciudad: Ciudad;
}

export interface Producto {
    idProducto: number;
    categoria: Categoria;
    codigoProducto: string;
    modelo: string;
    estadoProducto: EstadoProducto;
    serieProducto: string;
    precio: number;
}

export interface DetallePedido {
    idDetallePedido: number;
    idPedido: number;
    cantidad: number;
    descripcionRepuesto: string;
}

export interface CreateDetallePedido {
    cantidad: number;
    descripcionRepuesto: string;
}

export interface UpdateDetallePedido {
    idDetallePedido: number;
    idPedido: number;
    cantidad: number;
    descripcionRepuesto: string;
}

export interface Ciudad {
    idCiudad: number;
    nombreCiudad: string;
}

export interface Categoria {
    idCategoria: number;
    nombreCategoria: string;
}

export interface EstadoProducto {
    idEstadoProducto: number;
    nombreEstadoProducto: string;
}
