import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppRoutingPedidosModule } from './pedidos-routing.module';
import { PedidosComponent } from './view/pedidos.component';
import { PedidoDialogComponent } from './component/PedidoDialogComponent';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingPedidosModule
  ],
  declarations: [
    PedidosComponent,
    PedidoDialogComponent
  ]
})
export class PedidosModule { }
