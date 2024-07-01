import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeviciosComponent } from './view/sevicios/sevicios.component';

const routes: Routes = [
  {path: '', component: SeviciosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingServiciosModule {}
