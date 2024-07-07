import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/Request/loginRequest';
import { Observable, of } from 'rxjs';
import { LoginResponse } from '../models/Response/loginResponse';
import { RegistroRequest } from '../models/Request/registroRequest';
import { environment } from 'src/environments/environment';
import { RegistroResponse } from '../models/Response/registroResponse';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

constructor(private http: HttpClient) {}
  private uri = environment.apiUrl;  
  login(criteria: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.uri+'/Security/login',criteria);
  }
  registro(criteria: RegistroRequest): Observable<RegistroResponse> {
    return this.http.post<RegistroResponse>(this.uri+'/Security/register',criteria);
  }
}
