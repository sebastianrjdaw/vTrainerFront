import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntrenadorRoutingModule } from './entrenador-routing.module';
import { EntrenamientosCrudComponent } from './entrenamientos-crud/entrenamientos-crud.component';
import { JugadoresCrudComponent } from './jugadores-crud/jugadores-crud.component';

@NgModule({
  declarations: [EntrenamientosCrudComponent, JugadoresCrudComponent],
  imports: [CommonModule, EntrenadorRoutingModule],
})
export class EntrenadorModule {}
