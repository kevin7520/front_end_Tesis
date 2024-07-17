import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ObtenerServicios } from '../models/obtenerServicio';
import { ObtenerProductos } from '../models/obtenerProducto';
import { ObtenerProformasResponse } from '../models/obtenerProformasResponse';
@Injectable({
  providedIn: 'root'
})
export class ReportesService {

constructor(private http: HttpClient) { }

  private uri = environment.apiUrl;

  obtenerServicios() : Observable<ObtenerServicios> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<ObtenerServicios>(`${this.uri}/Servicio`, { headers });
  }

  obtenerProductos() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<ObtenerProductos>('http://localhost:5222/api/Producto',{ headers });
  }

  obtenerProformas(): Observable<ObtenerProformasResponse> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<ObtenerProformasResponse>(`${this.uri}/Proforma`, { headers });
  }
}
