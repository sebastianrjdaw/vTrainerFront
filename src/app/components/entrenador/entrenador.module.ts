import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntrenadorRoutingModule } from './entrenador-routing.module';
import { EntrenamientosCrudComponent } from './entrenamientos-crud/entrenamientos-crud.component';
import { JugadoresCrudComponent } from './jugadores-crud/jugadores-crud.component';
import { EquipoComponent } from './equipo/equipo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EntrenamientosCrudComponent,
    JugadoresCrudComponent,
    EquipoComponent,
  ],
  imports: [
    CommonModule,
    EntrenadorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class EntrenadorModule {}
