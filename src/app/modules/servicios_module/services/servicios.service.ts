import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TecnicosResponse } from '../models/response/tecnicosResponse';
import { ClientesResponseResponse } from '../models/response/clientesResponse';
import { CiudadesResponse } from '../models/response/ciudadesResponse';
import { CrearClienteRequest } from '../models/request/CrearClienteRequest';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

constructor(private http: HttpClient) { }

  private uri = environment.apiUrl;

   getTecnicos(): Observable<TecnicosResponse> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<TecnicosResponse>(`${this.uri}/Tecnico`);
  } 
  
   getClientes(): Observable<ClientesResponseResponse> {
    const token = localStorage.getItem('token');
    //const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<ClientesResponseResponse>(`${this.uri}/Cliente`);
   }
  
   crearCliente(criteria: CrearClienteRequest): Observable<ClientesResponseResponse> {
    const token = localStorage.getItem('token');
    //const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<ClientesResponseResponse>(`${this.uri}/Cliente`,criteria);
   }
  
   getCiudades(): Observable<CiudadesResponse> {
    const token = localStorage.getItem('token');
    //const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<CiudadesResponse>(`${this.uri}/Cliente/Ciudades`);
   }
  
  
  
}
