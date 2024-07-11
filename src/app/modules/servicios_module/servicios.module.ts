import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingServiciosModule } from './servicios-routing.module';
import { SeviciosComponent } from './view/sevicios/sevicios.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ServicioInstalacionComponent } from './view/servicio-instalacion/servicio-instalacion.component';
import { ClientesComponent } from './common/clientes/clientes.component';
import { TecnicosComponent } from './common/tecnicos/tecnicos.component';
import { ProductosComponent } from './common/productos/productos.component';
import { ServicioMantenimientoComponent } from './view/servicio-mantenimiento/servicio-mantenimiento.component';
import { ServicioGarantiaComponent } from './view/servicio-garantia/servicio-garantia.component';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingServiciosModule,
    SharedModule
  ],
  declarations: [
    SeviciosComponent,
    ServicioInstalacionComponent,
    ClientesComponent,
    TecnicosComponent,
    ProductosComponent,
    ServicioMantenimientoComponent,
    ServicioGarantiaComponent
  ]
})
export class ServciosModule { }
