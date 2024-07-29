import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { LoginRequest } from '../../models/Request/loginRequest';
import { NotificationService } from 'src/app/shared/services/notificacion.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-inicioSesion',
  templateUrl: './inicioSesion.component.html',
  styleUrls: ['./inicioSesion.component.scss']
})
export class InicioSesionComponent implements OnInit {

  constructor(private _loginService: LoginService,
              private notificationService: NotificationService,
              private _router: Router) { }
  viewPasword : boolean = true;

  loginFormGroup = new FormGroup({
    email: new FormControl('', { validators: [Validators.required, Validators.email], updateOn: 'blur' }),
    password: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
  });

  ngOnInit() {
  }

  login() {
    const criteria : LoginRequest = {
      correo: this.loginFormGroup.value.email!,
      password: this.loginFormGroup.value.password!
    }
    this._loginService.login(criteria).subscribe(dataResponse => {
      if (dataResponse.codigo == '200') {
        localStorage.setItem('token', dataResponse.data[0]);
        localStorage.setItem('id_rol', dataResponse.data[1]);
        localStorage.setItem('id_user', dataResponse.data[2]);
        this.notificationService.showSuccess(dataResponse.mensaje);
        this._router.navigateByUrl("/inicio")
      }
      else {
        this.notificationService.showError(dataResponse.mensaje);
      }
    }, (err) => {
      this.notificationService.showError(err.error.mensaje);
    });
  }

}
