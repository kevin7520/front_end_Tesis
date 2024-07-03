import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProductosRequest } from '../models/request/productosRequest';
import { ProductoResponse } from '../models/response/productoResponse';
import { agregarProductoRequest } from '../models/request/agregarProductoRequest';
import { GeneralResponse } from 'src/app/shared/models/generaResponse';
import { EliminarProductoRequest } from '../models/request/eliminarProductoRequest';
import { EditarProductoRequest } from '../models/request/editarProductoRequest';
import { EditarProductoResponse } from '../models/response/editarProductosResponse';
import { AgregarProductoResponse} from '../models/response/agregarProductoResponse';
import { EliminarProductoResponse } from '../models/response/eliminarProductoResponse';
import { ObtenerCategoriaResponse } from '../models/response/obtenerCategotiasResponse';
import { ObtenerEstadosResponse } from '../models/response/obtenerEstadosResponse';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

constructor(private http: HttpClient) {}

  getProductos(criteria: ProductosRequest): Observable<ProductoResponse> {
    return this.http.get<ProductoResponse>('http://localhost:5222/api/Producto');
    
  }

  agregarProducto(criteria: agregarProductoRequest) : Observable<AgregarProductoResponse> {
    return this.http.post<AgregarProductoResponse>('http://localhost:5222/api/Producto',criteria);
  }

  eliminarProducto(criteria: EliminarProductoRequest) : Observable<EliminarProductoResponse> {
    return this.http.delete<EliminarProductoResponse>('http://localhost:5222/api/Producto/'+criteria.id_producto);
  }

  editarProducto(criteria: EditarProductoRequest, idProducto : number): Observable<EditarProductoResponse> {
    return this.http.put<EditarProductoResponse>('http://localhost:5222/api/Producto/'+idProducto,criteria);
  }

  obtenerCategoria(): Observable<ObtenerCategoriaResponse[]> {
    return this.http.get<ObtenerCategoriaResponse[]>('http://localhost:5222/api/Producto/Categorias');
  }

  obtenerEstados(): Observable<ObtenerEstadosResponse[]> {
    return this.http.get<ObtenerEstadosResponse[]>('http://localhost:5222/api/Producto/Estados');
  }
}
