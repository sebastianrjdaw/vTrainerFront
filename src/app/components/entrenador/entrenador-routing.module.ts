import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntrenamientosCrudComponent } from './entrenamientos-crud/entrenamientos-crud.component';
import { JugadoresCrudComponent } from './jugadores-crud/jugadores-crud.component';

const routes: Routes = [
  { path: 'entrenamientos', component: EntrenamientosCrudComponent },
  { path: 'jugadores', component: JugadoresCrudComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntrenadorRoutingModule {}
