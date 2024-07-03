import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/Request/loginRequest';
import { Observable, of } from 'rxjs';
import { LoginResponse } from '../models/Response/loginResponse';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

constructor(private http: HttpClient) {}

  login(criteria: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('http://localhost:5222/api/Security/login',criteria);
  }
}
