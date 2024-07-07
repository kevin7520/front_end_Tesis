import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { NotificationService } from 'src/app/shared/services/notificacion.service';
import { RegistroRequest } from '../../models/Request/registroRequest';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  constructor(private _loginService: LoginService,
              private notificationService: NotificationService,) { }

  viewPasword = false;
  valueRol : string= "1";

  registroFormGroup = new FormGroup({
    email: new FormControl('', { validators: [Validators.required, Validators.email], updateOn: 'blur' }),
    password: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
    usuario: new FormControl('', { validators: [Validators.required], updateOn: 'blur' }),
    valueRol: new FormControl(1, { validators: Validators.required, updateOn: 'blur' })
  });
  ngOnInit() {
  }

 registro() {
    const criteria : RegistroRequest = {
        nombreUsuario: this.registroFormGroup.value.usuario!,
        contraseña: this.registroFormGroup.value.password!,
      correo: this.registroFormGroup.value.email!,
        idRol: this.registroFormGroup.value.valueRol!,
        idEstado: 1
    }
   this._loginService.registro(criteria).subscribe(dataResponse => {
     if (dataResponse.codigo == "200") {
       this.notificationService.showSuccess(dataResponse.mensaje);
       this.registroFormGroup.reset();
     }
     else {
       this.notificationService.showError(dataResponse.mensaje);
     }
   }, err => {
     if (err.error.codigo == '409') {
       this.notificationService.showError(err.error.codigo.mensaje);
     }
     else {
       this.notificationService.showError("Ocurrieron errores técnicos intentalo más tarde.");
     }
    })
  }
}
