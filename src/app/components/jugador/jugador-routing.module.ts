import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JugadorHomeComponent } from './jugador-home/jugador-home.component';
import { SendErrorsComponent } from '../Auth/send-errors/send-errors.component';
import { MainViewComponent } from './main-view/main-view.component';
import { JugadorSesionesComponent } from './jugador-sesiones/jugador-sesiones.component';

const routes: Routes = [
  {
    path: '',
    component: JugadorHomeComponent,
    children: [
      { path: 'main', component: MainViewComponent },
      { path: 'sesiones', component: JugadorSesionesComponent },
      { path: 'errors', component: SendErrorsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JugadorRoutingModule {}
