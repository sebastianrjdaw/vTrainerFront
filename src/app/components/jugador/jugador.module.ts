import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { JugadorRoutingModule } from './jugador-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainViewComponent } from './main-view/main-view.component';
import { JugadorSesionesComponent } from './jugador-sesiones/jugador-sesiones.component';
import { InfoJugadorComponent } from './info-jugador/info-jugador.component';

@NgModule({
  declarations: [MainViewComponent, JugadorSesionesComponent, InfoJugadorComponent],
  imports: [
    CommonModule,
    JugadorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
  ],
})
export class JugadorModule {}
