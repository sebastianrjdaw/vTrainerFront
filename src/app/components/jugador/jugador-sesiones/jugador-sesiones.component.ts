import { Component, OnInit, ViewChild } from '@angular/core';
import { JugadorService } from 'src/app/services/jugador.service';
import timeGridPlugin from '@fullcalendar/timegrid';
import { CalendarOptions } from '@fullcalendar/core';
import { FullCalendarComponent } from '@fullcalendar/angular';

@Component({
  selector: 'app-jugador-sesiones',
  templateUrl: './jugador-sesiones.component.html',
  styleUrls: ['./jugador-sesiones.component.css'],
})
export class JugadorSesionesComponent implements OnInit {
  @ViewChild('calendar') calendarComponent: FullCalendarComponent | undefined;

  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    plugins: [timeGridPlugin],
    editable: false,
    selectable: false,
    droppable: false,
    eventStartEditable: false,
    eventDurationEditable: false,
    slotMinTime: '09:00:00',
    slotMaxTime: '22:00:00',
    hiddenDays: [0, 6],
    locale: 'es',
    events: [], // Inicializa el array de eventos vacío
  };

  constructor(private jugadorService: JugadorService) {}

  ngOnInit(): void {
    this.cargarSesiones();
  }

  cargarSesiones(): void {
    this.jugadorService.getSesionesUsuario().subscribe((sesiones: any) => {
      const eventos: any = [];

      sesiones.forEach((sesion: any) => {
        let horaInicio = new Date(sesion.hora_inicio); // Hora de inicio de la sesión

        sesion.entrenamientos.forEach((entrenamiento: any) => {
          eventos.push({
            title: entrenamiento.titulo,
            start: new Date(horaInicio).toISOString(), // La hora de inicio para este entrenamiento
            end: new Date(
              horaInicio.setHours(horaInicio.getHours() + 1)
            ).toISOString(), // La hora de inicio más una hora
            // Añade más propiedades de acuerdo a tu modelo de Entrenamiento si es necesario
          });

          // Ajusta la hora de inicio para el siguiente entrenamiento
          horaInicio = new Date(horaInicio.setHours(horaInicio.getHours() + 1));
        });
      });

      // Actualiza las opciones del calendario para incluir los eventos
      this.calendarOptions = { ...this.calendarOptions, events: eventos };
    });
  }
}
