import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReportesComponent } from './view/reportes/reportes.component';
import { AppRoutingProformasModule } from './reportes-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingProformasModule
  ],
  declarations: [
    ReportesComponent
  ]
})
export class ReportesModule { }
