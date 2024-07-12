import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProformasComponent } from './view/proformas/proformas.component';
import { AppRoutingProformasModule } from './proformas-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingProformasModule
  ],
  declarations: [
    ProformasComponent
  ]
})
export class ProformasModule { }
