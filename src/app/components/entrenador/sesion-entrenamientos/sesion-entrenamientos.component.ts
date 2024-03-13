import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import interactionPlugin, {
  Draggable,
  EventReceiveArg,
} from '@fullcalendar/interaction';
import {
  Entrenamiento,
  Etiqueta,
  Sesion,
  EventoCalendario,
  EventosPorDia,
} from 'src/app/interfaces/entrenador';
import { EntrenadorService } from 'src/app/services/entrenador.service';
import timeGridPlugin from '@fullcalendar/timegrid';

import { EventInput } from '@fullcalendar/core';
import { ChangeDetectorRef } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import { FullCalendarComponent } from '@fullcalendar/angular';

@Component({
  selector: 'app-sesion-entrenamientos',
  templateUrl: './sesion-entrenamientos.component.html',
  styleUrls: ['./sesion-entrenamientos.component.css'],
})
export class SesionEntrenamientosComponent implements OnInit, AfterViewInit {
  @ViewChild('externalEvents') externalEvents: ElementRef | null = null;
  @ViewChild('calendar') calendarComponent: FullCalendarComponent | undefined;
  entrenamientos: Entrenamiento[] = [];
  entrenamientosUser: Entrenamiento[] = [];
  entrenamientosDef: Entrenamiento[] = [];
  etiquetas: Etiqueta[] = [];
  sesiones: Sesion[] = [];
  eventosCalendario: EventInput[] = [];
  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    plugins: [timeGridPlugin, interactionPlugin],
    editable: true,
    selectable: true,
    droppable: true,
    events: this.eventosCalendario,
    slotMinTime: '09:00:00',
    slotMaxTime: '22:00:00',
    hiddenDays: [0, 6],
    locale: 'es',
    dateClick: (dateClickEvent) => {
      // <-- add the callback here as one of the properties of `options`
      console.log('DATE CLICKED !!!');
    },

    eventClick: (eventClickEvent) => {
      console.log('EVENT CLICKED !!!');
    },

    eventDragStop: (eventDragStopEvent) => {
      console.log(eventDragStopEvent.event.extendedProps);
      console.log(eventDragStopEvent.event.extendedProps['entrenamientoid']);
      console.log(eventDragStopEvent.event.extendedProps['entrenamientoId']);
      console.log('EVENT DRAG STOP !!!');
    },
  };

  constructor(
    private entrenadorService: EntrenadorService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarSesionesUsuario();
    this.cargaEntrenamientosUser();
    this.cargaEntrenamientosDef();
    this.cargaEtiquetas();
  }

  cargarSesionesUsuario() {
    this.entrenadorService.getSesionesUsuario().subscribe({
      next: (sesiones: any[]) => {
        console.log(sesiones);
        // Usa any o define una interfaz adecuada para tipar correctamente tu respuesta
        this.eventosCalendario = sesiones.flatMap((sesion) =>
          sesion.entrenamientos.map((entrenamiento: any) => ({
            title: `Entrenamiento ${entrenamiento.titulo}`, // Usar el título del entrenamiento
            start: sesion.hora_inicio, // Asegúrate de que esto es una cadena de fecha en formato ISO
            end: sesion.hora_fin, // Asegúrate de que esto es una cadena de fecha en formato ISO
            extendedProps: {
              entrenamientoId: entrenamiento.id,
            },
          }))
        );

        this.calendarOptions.events = this.eventosCalendario;
        this.changeDetectorRef.detectChanges();
      },
      error: (error) => {
        console.error('Error al cargar las sesiones del usuario', error);
      },
    });
  }

  cargaEtiquetas() {
    this.entrenadorService.obtenerEtiquetas().subscribe({
      next: (data: any) => {
        this.etiquetas = data[0];
      },
    });
  }

  cargaEntrenamientosDef() {
    this.entrenadorService.obtenerEntrenamientosDef().subscribe({
      next: (data: any) => {
        this.entrenamientosDef = data.entrenamientos;
      },
    });
  }

  cargaEntrenamientosUser() {
    this.entrenadorService.obtenerEntrenamientosUser().subscribe({
      next: (data: any) => {
        this.entrenamientosUser = data.entrenamientos;
      },
    });
  }

  ngAfterViewInit() {
    if (this.externalEvents) {
      new Draggable(this.externalEvents.nativeElement, {
        itemSelector: '.fc-event',
        eventData: function (eventEl) {
          return {
            title: eventEl.innerText,
            duration: eventEl.getAttribute('data-duration'),
            extendedProps: {
              entrenamientoId: eventEl.getAttribute('data-id'), // Ejemplo de propiedad personalizada
            },
          };
        },
      });
    }
  }

  formatDate(date: Date): string {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  agruparEventosPorDia(eventos: EventoCalendario[]): EventosPorDia {
    const eventosPorDia: EventosPorDia = {};

    eventos.forEach((evento) => {
      const fecha = evento.start.split('T')[0]; // Asumiendo que `start` es una cadena en formato ISO

      if (!eventosPorDia[fecha]) {
        eventosPorDia[fecha] = [];
      }

      eventosPorDia[fecha].push({
        title: evento.title,
        start: evento.start,
        end: evento.end,
        extendedProps: {
          entrenamientoId: evento.extendedProps['entrenamientoId'],
        },
      });
    });

    return eventosPorDia;
  }

  crearSesiones(eventosPorDia: EventosPorDia): Sesion[] {
    return Object.keys(eventosPorDia).map((fecha) => {
      const eventosDelDia = eventosPorDia[fecha];
      const entrenamientoIds = Array.from(
        new Set(
          eventosDelDia.map((evento) =>
            parseInt(evento.extendedProps['entrenamientoId'])
          )
        )
      );

      // Asumiendo que `start` y `end` son objetos Date, o puedes convertirlos usando new Date()
      const horaInicio = new Date(eventosDelDia[0].start)
        .toLocaleString('sv-SE')
        .replace(' ', 'T');
      const horaFin = new Date(eventosDelDia[eventosDelDia.length - 1].end)
        .toLocaleString('sv-SE')
        .replace(' ', 'T');

      return {
        fecha: fecha,
        hora_inicio: horaInicio,
        hora_fin: horaFin,
        entrenamientos: entrenamientoIds,
      };
    });
  }

  enviarSesionesAlBackend(sesiones: Sesion[]) {
    sesiones.forEach((sesion) => {
      this.entrenadorService.crearSesion(sesion).subscribe({
        next: (respuesta) => console.log('Sesión guardada', respuesta),
        error: (error) => console.error('Error al guardar sesión', error),
      });
    });
  }

  guardarSesiones() {
    // Asegúrate de que la referencia al componente del calendario esté definida
    if (this.calendarComponent && this.calendarComponent.getApi) {
      const calendarApi = this.calendarComponent.getApi();
      const eventos: EventoCalendario[] = calendarApi
        .getEvents()
        .map((event: any) => ({
          title: event.title,
          start: event.start.toISOString(),
          end:
            (event.end && event.end.toISOString()) || event.start.toISOString(),
          extendedProps: event.extendedProps,
        }));

      // Agrupa los eventos por día
      const eventosPorDia = this.agruparEventosPorDia(eventos);

      // Crea las sesiones basadas en los eventos agrupados
      const sesiones = this.crearSesiones(eventosPorDia);

      console.log(sesiones);
      // Envía las sesiones al backend
      this.enviarSesionesAlBackend(sesiones);
    } else {
      console.error('El componente del calendario no está definido.');
    }
  }
}
