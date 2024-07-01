import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppRoutingInicioTekaModule } from './inicio_teka-routing.module';
import { InicioComponent } from './view/inicio/inicio.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingInicioTekaModule
  ],
  declarations: [
    InicioComponent
  ]
})
export class InicioModule { }
