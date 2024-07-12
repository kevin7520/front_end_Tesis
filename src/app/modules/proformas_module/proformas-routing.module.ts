import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProformasComponent } from './view/proformas/proformas.component';

const routes: Routes = [
  {path: '', component: ProformasComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingProformasModule {}
