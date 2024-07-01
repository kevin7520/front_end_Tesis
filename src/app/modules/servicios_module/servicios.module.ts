import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingServiciosModule } from './servicios-routing.module';
import { SeviciosComponent } from './view/sevicios/sevicios.component';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingServiciosModule
  ],
  declarations: [
    SeviciosComponent
  ]
})
export class ServciosModule { }
