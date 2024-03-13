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
import { Entrenamiento, Etiqueta, Sesion } from 'src/app/interfaces/entrenador';
import { EntrenadorService } from 'src/app/services/entrenador.service';
import timeGridPlugin from '@fullcalendar/timegrid';

import { EventInput } from '@fullcalendar/core';
import { ChangeDetectorRef } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking

@Component({
  selector: 'app-sesion-entrenamientos',
  templateUrl: './sesion-entrenamientos.component.html',
  styleUrls: ['./sesion-entrenamientos.component.css'],
})
export class SesionEntrenamientosComponent implements OnInit, AfterViewInit {
  @ViewChild('externalEvents') externalEvents: ElementRef | null = null;

  entrenamientos: Entrenamiento[] = [];
  entrenamientosUser: Entrenamiento[] = [];
  entrenamientosDef: Entrenamiento[] = [];
  etiquetas: Etiqueta[] = [];
  sesiones: Sesion[] = [];
  eventosCalendario: EventInput[] = [];

  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    plugins: [timeGridPlugin],
    editable: true,
    selectable: true,
    droppable: true,
    drop: this.handleEventReceive.bind(this),
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
      console.log('EVENT DRAG STOP !!!');
    },

    eventReceive: this.handleEventReceive.bind(this),
  };

  constructor(
    private entrenadorService: EntrenadorService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargaEntrenamientosUser();
    this.cargaEntrenamientosDef();
    this.cargaEtiquetas();
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

  handleEventReceive(info: any) {
    const entrenamientoId = Number(info.event._def.extendedProps.id); // Asegúrate de usar la propiedad correcta para obtener el ID
    const fechaInicio = info.event.start;
    let fechaFin = new Date(fechaInicio);
    fechaFin.setHours(fechaInicio.getHours() + 3); // Ajusta la hora de fin sumando 3 horas a la hora de inicio

    const nuevaSesion: Sesion = {
      fecha: this.formatDate(fechaInicio), // Asegúrate de formatear la fecha correctamente
      hora_inicio: fechaInicio.toISOString(),
      hora_fin: fechaFin.toISOString(),
      entrenamientos: [entrenamientoId],
    };

    // Aquí agregarías la nueva sesión a tu estado o la enviarías a tu backend
  }

  ngAfterViewInit() {
    if (this.externalEvents) {
      new Draggable(this.externalEvents.nativeElement, {
        itemSelector: '.fc-event',
        eventData: function (eventEl) {
          let event = {
            title: eventEl.innerText, // Obtiene el texto del evento para el título
            duration: eventEl.getAttribute('data-duration'), // Usa un atributo data-duration para la duración del evento
          };
          return event;
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

  guardarSesiones() {
    console.log('hola');
  }
}
