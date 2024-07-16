import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProformasComponent } from './view/proformas/proformas.component';
import { AppRoutingProformasModule } from './proformas-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingProformasModule,
    SharedModule
  ],
  declarations: [
    ProformasComponent
  ]
})
export class ProformasModule { }
