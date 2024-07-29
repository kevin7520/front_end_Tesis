import { HttpClient, HttpHeaders } from '@angular/common/http';
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
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

constructor(private http: HttpClient) {}
 private uri = environment.apiUrl;
  getProductos(criteria: ProductosRequest): Observable<ProductoResponse> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<ProductoResponse>(this.uri+'/Producto',{ headers });
    
  }

  agregarProducto(criteria: agregarProductoRequest): Observable<AgregarProductoResponse> {
     const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<AgregarProductoResponse>(this.uri+'/Producto',criteria,{ headers });
  }

  eliminarProducto(criteria: EliminarProductoRequest): Observable<EliminarProductoResponse> {
     const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<EliminarProductoResponse>(this.uri+'/Producto/'+criteria.id_producto,{ headers });
  }

  editarProducto(criteria: EditarProductoRequest, idProducto: number): Observable<EditarProductoResponse> {
     const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<EditarProductoResponse>(this.uri+'/Producto/'+idProducto,criteria,{ headers });
  }

  obtenerCategoria(): Observable<ObtenerCategoriaResponse[]> {
     const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<ObtenerCategoriaResponse[]>(this.uri+'/Producto/Categorias',{ headers });
  }

  obtenerEstados(): Observable<ObtenerEstadosResponse[]> {
     const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<ObtenerEstadosResponse[]>(this.uri+'/Producto/Estados',{ headers });
  }
}
