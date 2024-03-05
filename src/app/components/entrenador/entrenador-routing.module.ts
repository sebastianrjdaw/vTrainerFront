import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntrenamientosCrudComponent } from './entrenamientos-crud/entrenamientos-crud.component';
import { JugadoresCrudComponent } from './jugadores-crud/jugadores-crud.component';
import { EquipoComponent } from './equipo/equipo.component';
import { EntrenadorHomeComponent } from './entrenador-home/entrenador-home.component';
import { MainViewComponent } from './main-view/main-view.component';
const routes: Routes = [
  {
    path: '', // Ruta raíz del módulo Entrenador
    component: EntrenadorHomeComponent, // El componente que incluye la barra lateral
    children: [
      // Rutas hijas que se cargarán dentro del <router-outlet> de EntrenadorHomeComponent
      { path: 'main', component: MainViewComponent },
      { path: 'entrenamientos', component: EntrenamientosCrudComponent },
      { path: 'jugadores', component: JugadoresCrudComponent },
      { path: 'equipo', component: EquipoComponent },
      // ... (cualquier otra subruta de entrenador)
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntrenadorRoutingModule {}
