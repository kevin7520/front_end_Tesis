import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './view/inicio/inicio.component';

const routes: Routes = [
  { path: '', 
    component: InicioComponent, 
    children: [
      {
        path: 'servicios', loadChildren: () => import('../servicios_module/servicios.module').then(m => m.ServciosModule)
      },
      {
        path: 'productos', loadChildren: () => import('../productos_module/productos.module').then(m => m.ProductosModule)
      },
      {
        path: 'proformas', loadChildren: () => import('..//proformas_module/proformas.module').then(m => m.ProformasModule)
      },
      {
        path: 'pedidos', loadChildren: () => import('../pedidos_module/pedidos.module').then(m => m.PedidosModule)
      },
      {
        path: 'reportes', loadChildren: () => import('../reportes_module/reportes.module').then(m => m.ReportesModule)
      },
      {
        path: 'crear', loadChildren: () => import('../login_module/login.module').then(m => m.LoginModule)
      },
      { path: '', 
        redirectTo: 'reportes', 
        pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingInicioTekaModule {}
