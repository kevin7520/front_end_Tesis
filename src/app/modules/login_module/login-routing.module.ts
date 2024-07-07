import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioSesionComponent } from './view/inicioSesion/inicioSesion.component';
import { RegistroComponent } from './view/registro/registro.component';

const routes: Routes = [
  { path: '', component: InicioSesionComponent },
  { path: 'usuario', component: RegistroComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingLoginModule {}
