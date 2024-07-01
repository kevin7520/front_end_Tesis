import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProductosRequest } from '../models/request/productosRequest';
import { ProductoResponse } from '../models/response/productoResponse';
import { agregarProductoRequest } from '../models/request/agregarProductoRequest';
import { GeneralResponse } from 'src/app/shared/models/generaResponse';
import { EliminarProductoRequest } from '../models/request/eliminarProductoRequest';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

constructor(private http: HttpClient) {}

  getProductos(criteria: ProductosRequest) : Observable<ProductoResponse> {
    const mockedResponse: ProductoResponse = {
      respuesta: {
        codigo: "0",
        msg: "OK"
      },
      productos: [
       {
        id_producto: 10,
        categoria: "string",
        codigo_producto: 10,
        modelo: "string",
        serie_producto: "string",
        estado_producto: "string",
       },
       {
        id_producto: 10,
        categoria: "string",
        codigo_producto: 10,
        modelo: "string",
        serie_producto: "string",
        estado_producto: "string",
       },
       {
        id_producto: 10,
        categoria: "string",
        codigo_producto: 10,
        modelo: "string",
        serie_producto: "string",
        estado_producto: "string",
       },
       {
        id_producto: 10,
        categoria: "string",
        codigo_producto: 10,
        modelo: "string",
        serie_producto: "string",
        estado_producto: "string",
       },
       {
        id_producto: 10,
        categoria: "string",
        codigo_producto: 10,
        modelo: "string",
        serie_producto: "string",
        estado_producto: "string",
       },
       {
        id_producto: 10,
        categoria: "string",
        codigo_producto: 10,
        modelo: "string",
        serie_producto: "string",
        estado_producto: "string",
       },
       {
        id_producto: 10,
        categoria: "string",
        codigo_producto: 10,
        modelo: "string",
        serie_producto: "string",
        estado_producto: "string",
       },
       {
        id_producto: 10,
        categoria: "string",
        codigo_producto: 10,
        modelo: "string",
        serie_producto: "string",
        estado_producto: "string",
       },
       {
        id_producto: 10,
        categoria: "string",
        codigo_producto: 10,
        modelo: "string",
        serie_producto: "string",
        estado_producto: "string",
       },
       {
        id_producto: 10,
        categoria: "string",
        codigo_producto: 10,
        modelo: "string",
        serie_producto: "string",
        estado_producto: "string",
       },
      ]
    };

    // Devuelve un observable de la respuesta quemada
    return of(mockedResponse);
  }

  agregarProducto(criteria: agregarProductoRequest) : Observable<GeneralResponse> {
    const mockedResponse : GeneralResponse = {
        codigo: "1",
        msg: "OK"
    }
    return of(mockedResponse);
  }

  eliminarProducto(criteria: EliminarProductoRequest) : Observable<GeneralResponse> {
    const mockedResponse : GeneralResponse = {
        codigo: "0",
        msg: "OK"
    }
    return of(mockedResponse);
  }
}
