import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppRoutingLoginModule } from './login-routing.module';
import { InicioSesionComponent } from './view/inicioSesion/inicioSesion.component';
import { RegistroComponent } from './view/registro/registro.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingLoginModule
  ],
  declarations: [
    InicioSesionComponent,
    RegistroComponent
  ]
})
export class LoginModule { }
