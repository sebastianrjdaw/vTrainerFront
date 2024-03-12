import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { EntrenadorRoutingModule } from './entrenador-routing.module';
import { EntrenamientosCrudComponent } from './entrenamientos-crud/entrenamientos-crud.component';
import { JugadoresCrudComponent } from './jugadores-crud/jugadores-crud.component';
import { EquipoComponent } from './equipo/equipo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SesionEntrenamientosComponent } from './sesion-entrenamientos/sesion-entrenamientos.component';

@NgModule({
  declarations: [
    EntrenamientosCrudComponent,
    JugadoresCrudComponent,
    EquipoComponent,
    SesionEntrenamientosComponent,
  ],
  imports: [
    CommonModule,
    EntrenadorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
  ],
})
export class EntrenadorModule {}
