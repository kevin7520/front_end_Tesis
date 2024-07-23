import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppRoutingPedidosModule } from './pedidos-routing.module';
import { PedidosComponent } from './view/pedidos.component';
import { PedidoCrearEditarComponent } from './common/pedidoCrearEditar/pedidoCrearEditar.component';
import { Documento_PedidoComponent } from './common/documento_visualizacion/documento_visualizacion.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingPedidosModule
  ],
  declarations: [
    PedidosComponent,
    PedidoCrearEditarComponent,
    Documento_PedidoComponent
  ]
})
export class PedidosModule { }
