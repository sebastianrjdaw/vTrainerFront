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
import Swal from 'sweetalert2';
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
  // ViewChild se usa para referenciar elementos del template.
  // Aquí se obtienen referencias tanto a los eventos externos como al componente del calendario.

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
    events: [],
    slotMinTime: '09:00:00',
    slotMaxTime: '22:00:00',
    hiddenDays: [0, 6],
    locale: 'es',
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
        // Considera definir una interfaz que represente la estructura de tus sesiones
        this.eventosCalendario = sesiones.flatMap((sesion) => {
          // Asume que la hora de inicio de la sesión es la hora de inicio del primer entrenamiento
          let horaInicioSesion = new Date(sesion.hora_inicio);

          return sesion.entrenamientos.map((entrenamiento: any, index: any) => {
            // Clona la hora de inicio para evitar mutaciones
            let horaInicioEntrenamiento = new Date(horaInicioSesion.getTime());

            // Ajusta la hora de inicio basándose en la posición del entrenamiento
            horaInicioEntrenamiento.setHours(
              horaInicioSesion.getHours() + index
            );

            // Calcula la hora de fin como una hora después del inicio
            let horaFinEntrenamiento = new Date(
              horaInicioEntrenamiento.getTime()
            );
            horaFinEntrenamiento.setHours(
              horaInicioEntrenamiento.getHours() + 1
            );

            return {
              title: `Entrenamiento ${entrenamiento.titulo}`,
              start: horaInicioEntrenamiento.toISOString(),
              end: horaFinEntrenamiento.toISOString(),
              extendedProps: {
                entrenamientoId: entrenamiento.id,
              },
            };
          });
        });

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
      // Draggable permite arrastrar elementos, aquí se configura para los eventos del calendario.
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

  //Froemateador
  formatDate(date: Date): string {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  // agruparEventosPorDia agrupa los eventos del FullCalendar por día.
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

  // crearSesiones transforma los eventos agrupados por día en sesiones de entrenamiento.
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
        next: (respuesta) =>
          Swal.fire({
            title: 'Sesiones Guardadas!',
            icon: 'success',
          }),
        error: (error) => console.error('Error al guardar sesión', error),
      });
    });
  }

  guardarSesiones() {
    Swal.fire({
      title: 'Estas seguro de que quieres guardar la sesión?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.calendarComponent && this.calendarComponent.getApi) {
          const calendarApi = this.calendarComponent.getApi();
          const eventos: EventoCalendario[] = calendarApi
            .getEvents()
            .map((event: any) => ({
              title: event.title,
              start: event.start.toISOString(),
              end:
                (event.end && event.end.toISOString()) ||
                event.start.toISOString(),
              extendedProps: event.extendedProps,
            }));

          // Agrupa los eventos por día
          const eventosPorDia = this.agruparEventosPorDia(eventos);

          // Crea las sesiones basadas en los eventos agrupados
          const sesiones = this.crearSesiones(eventosPorDia);
          // Envía las sesiones al backend
          this.enviarSesionesAlBackend(sesiones);
        }
      } else if (result.isDenied) {
        Swal.fire('Las sesiones no fueron guardadas');
      }
    });
  }
}
