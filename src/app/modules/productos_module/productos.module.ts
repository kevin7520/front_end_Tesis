import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingProductosModule } from './productos-routing.module';
import { ProductosComponent } from './view/productos/productos.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingProductosModule,
    SharedModule
  ],
  declarations: [
    ProductosComponent
  ]
})
export class ProductosModule { }
