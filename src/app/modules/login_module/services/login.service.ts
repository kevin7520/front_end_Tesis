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

  login(criteria: LoginRequest) : Observable<LoginResponse> {
    const mockedResponse: LoginResponse = {
      token: 'token_quemado',
      idPersona: 1,
      idRol: 1,
      respuesta: {
        codigo: "0",
        msg: "OK"
      }
    };

    // Devuelve un observable de la respuesta quemada
    return of(mockedResponse);
  }
}
