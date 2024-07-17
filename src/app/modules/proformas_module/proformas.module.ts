import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProformasComponent } from './view/proformas/proformas.component';
import { AppRoutingProformasModule } from './proformas-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { Documento_visualizacionComponent } from './common/documento_visualizacion/documento_visualizacion.component';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingProformasModule,
    SharedModule
  ],
  declarations: [
    ProformasComponent,
    Documento_visualizacionComponent
  ]
})
export class ProformasModule { }
