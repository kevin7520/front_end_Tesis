import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TecnicosResponse } from '../models/response/tecnicosResponse';
import { ClientesResponseResponse } from '../models/response/clientesResponse';
import { CiudadesResponse } from '../models/response/ciudadesResponse';
import { CrearClienteRequest } from '../models/request/CrearClienteRequest';
import { CrearTecnicoResponse } from '../models/response/crearTecnico';
import { CrearTecnicoRequest } from '../models/request/crearTecnicoRequest';
import { HorarioResponse } from '../models/response/horarioResponse';
import { CrearServiciosRequest } from '../models/request/crearServiciosRequest';
import { CrearServicioResponse } from '../models/response/CrearServicioResponse';
import { ObtenerServicios } from '../models/response/obtenerServicio';
import { CrearHorarioRequest } from '../models/request/crearHorario';
import { CrearHorarioResponse } from '../models/response/creatHorarioResponse';
import { EditarServicioRequest } from '../models/request/editarServicioRequest';
import { editarServcioResponse } from '../models/response/editarServicioResponse';
import { ConectarHorarioServicio } from '../models/request/conectarHorarioServicio';
import { EstadoServicioResponse } from '../models/response/estadiServicioResponse';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

constructor(private http: HttpClient) { }

  private uri = environment.apiUrl;

   getTecnicos(): Observable<TecnicosResponse> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<TecnicosResponse>(`${this.uri}/Tecnico`, { headers });
  } 
  
   getClientes(): Observable<ClientesResponseResponse> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<ClientesResponseResponse>(`${this.uri}/Cliente`, { headers });
   }
  
   crearCliente(criteria: CrearClienteRequest): Observable<ClientesResponseResponse> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<ClientesResponseResponse>(`${this.uri}/Cliente`,criteria, { headers });
   }
  
   crearTecnico(criteria: CrearTecnicoRequest): Observable<CrearTecnicoResponse> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<CrearTecnicoResponse>(`${this.uri}/Tecnico`,criteria, { headers });
   }
  
  horarioTecnico(id:number): Observable<HorarioResponse>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<HorarioResponse>(`${this.uri}/Tecnico/HorariosPorTecnico/${id}`, { headers });
   }
  
  
   getCiudades(): Observable<CiudadesResponse> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<CiudadesResponse>(`${this.uri}/Catalogo/Ciudades`, { headers });
   }
  
  crearServicio(criteria : CrearServiciosRequest) : Observable<CrearServicioResponse> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<CrearServicioResponse>(`${this.uri}/Servicio`,criteria, { headers });
  }

  crearHorario(criteria: CrearHorarioRequest) : Observable<CrearHorarioResponse> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<CrearHorarioResponse>(`${this.uri}/Tecnico/CrearHorario`,criteria, { headers });
  }

  guardarHorarioServicio(criteria:ConectarHorarioServicio): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.uri}/Servicio/AsignarHorarioTecnico`,criteria, { headers });
  }


  editarServicio(criteria: EditarServicioRequest, id: number) : Observable<editarServcioResponse> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<editarServcioResponse>(`${this.uri}/Servicio/${id}`,criteria, { headers });
  }

  obtenerServicios() : Observable<ObtenerServicios> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<ObtenerServicios>(`${this.uri}/Servicio`, { headers });
  }

  obtenerEstadosServicios() : Observable<EstadoServicioResponse>  {
     const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get<EstadoServicioResponse>(`${this.uri}/Servicio/EstadosServicios`, { headers });
  }

  verificarSerie(serie: string) : Observable<any> {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get<EstadoServicioResponse>(`${this.uri}/Servicio/Serie/Validador/${serie}`, { headers });
  }
  
  
  
}
