import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { LoginRequest } from '../../models/Request/loginRequest';

@Component({
  selector: 'app-inicioSesion',
  templateUrl: './inicioSesion.component.html',
  styleUrls: ['./inicioSesion.component.scss']
})
export class InicioSesionComponent implements OnInit {

  constructor(private _loginService: LoginService) { }
  viewPasword : boolean = true;

  loginFormGroup = new FormGroup({
    email: new FormControl('', { validators: [Validators.required, Validators.email], updateOn: 'blur' }),
    password: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
  });

  ngOnInit() {
  }

  login() {
    const criteria : LoginRequest = {
      email: this.loginFormGroup.value.email!,
      password: this.loginFormGroup.value.password!
    }
    this._loginService.login(criteria).subscribe(data=> {
      if(data.respuesta.codigo == '0'){
        
      }
      else {
        alert(data.respuesta.msg);
      }
    });
  }

}
