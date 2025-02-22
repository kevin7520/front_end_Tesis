import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente, CreatePedido, Pedido, Producto, ResponseGlobal, UpdatePedido } from '../models/pedidos';
import { ObtenerPedidosResponse } from '../models/obtenerProformasResponse';
import { CrearPedidoRequest } from '../models/crearProformaRequest';
import { respuestosPedidoResponse } from '../models/obtenerRespuestoResponse';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private uri = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // obtenerPedidos(): Observable<ResponseGlobal<Pedido[]>> {
  //   const token = localStorage.getItem('token');
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   return this.http.get<ResponseGlobal<Pedido[]>>(`${this.uri}/Pedido`, { headers });
  // }

  // obtenerPedido(id: number): Observable<ResponseGlobal<Pedido>> {
  //   const token = localStorage.getItem('token');
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   return this.http.get<ResponseGlobal<Pedido>>(`${this.uri}/Pedido/${id}`, { headers });
  // }

  // crearPedido(pedido: CreatePedido): Observable<ResponseGlobal<Pedido>> {
  //   const token = localStorage.getItem('token');
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   return this.http.post<ResponseGlobal<Pedido>>(`${this.uri}/Pedido`, pedido, { headers });
  // }

  // actualizarPedido(id: number, pedido: UpdatePedido): Observable<void> {
  //   const token = localStorage.getItem('token');
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   return this.http.put<void>(`${this.uri}/Pedido/${id}`, pedido, { headers });
  // }

  // eliminarPedido(id: number): Observable<ResponseGlobal<string>> {
  //   const token = localStorage.getItem('token');
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   return this.http.delete<ResponseGlobal<string>>(`${this.uri}/Pedido/${id}`, { headers });
  // }

  getDatos(): Observable<ObtenerPedidosResponse> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<ObtenerPedidosResponse>(`${this.uri}/Pedido`, { headers });
  } 

  getDatosId(id: number): Observable<ObtenerPedidosResponse> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<ObtenerPedidosResponse>(`${this.uri}/Pedido/${id}`, { headers });
  } 

  crearPedido(criteria: CrearPedidoRequest): Observable<ObtenerPedidosResponse> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<ObtenerPedidosResponse>(`${this.uri}/Pedido`,criteria, { headers });
  } 

  editarPedido(criteria: CrearPedidoRequest,id: number) : Observable<ObtenerPedidosResponse> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<ObtenerPedidosResponse>(`${this.uri}/Pedido/${id}`,criteria, { headers });
  } 

  getRepuestoProforma(id: number): Observable<respuestosPedidoResponse> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<respuestosPedidoResponse>(`${this.uri}/Pedido/detallePedido/${id}`, { headers });
  } 

  getClientes(): Observable<ResponseGlobal<Cliente[]>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<ResponseGlobal<Cliente[]>>(`${this.uri}/Cliente`, { headers });
   }

  //  getProductos(): Observable<ResponseGlobal<Producto[]>> {
  //  const token = localStorage.getItem('token');
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   return this.http.get<ResponseGlobal<Producto[]>>('http://localhost:5222/api/Producto',{ headers });
    
  // }
}
