import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ObtenerProformasResponse } from '../models/Response/obtenerProformasResponse';
import { respuestosProformaResponse } from '../models/Response/obtenerRespuestoResponse';
import { CrearProformaRequest } from '../models/request/crearProformaRequest';

@Injectable({
  providedIn: 'root'
})
export class ProformaService {

  constructor(private http: HttpClient) { }
  
  private uri = environment.apiUrl;

  getDatos(): Observable<ObtenerProformasResponse> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<ObtenerProformasResponse>(`${this.uri}/Proforma`, { headers });
  } 

  getDatosId(id: number): Observable<ObtenerProformasResponse> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<ObtenerProformasResponse>(`${this.uri}/Proforma/${id}`, { headers });
  } 

  crearProforma(criteria: CrearProformaRequest): Observable<ObtenerProformasResponse> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<ObtenerProformasResponse>(`${this.uri}/Proforma`,criteria, { headers });
  } 

  editarProforma(criteria: CrearProformaRequest,id: number) : Observable<ObtenerProformasResponse> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<ObtenerProformasResponse>(`${this.uri}/Proforma/${id}`,criteria, { headers });
  } 

  getRepuestoProforma(id: number): Observable<respuestosProformaResponse> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<respuestosProformaResponse>(`${this.uri}/Proforma/detalleProforma/${id}`, { headers });
  } 
}
