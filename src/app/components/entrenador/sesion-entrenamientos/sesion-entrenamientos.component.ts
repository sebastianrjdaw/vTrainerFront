import { Component, OnInit } from '@angular/core';

import { Entrenamiento, Etiqueta } from 'src/app/interfaces/entrenador';
import { EntrenadorService } from 'src/app/services/entrenador.service';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking

@Component({
  selector: 'app-sesion-entrenamientos',
  templateUrl: './sesion-entrenamientos.component.html',
  styleUrls: ['./sesion-entrenamientos.component.css'],
})
export class SesionEntrenamientosComponent implements OnInit {
  entrenamientos: Entrenamiento[] = [];
  entrenamientosUser: Entrenamiento[] = [];
  entrenamientosDef: Entrenamiento[] = [];
  etiquetas: Etiqueta[] = [];
  eventosCalendario: any[] = []; // tus eventos del calendario

  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    plugins: [timeGridPlugin],
    editable: true,
    selectable: true,
    events: this.eventosCalendario,
    slotMinTime: '09:00:00',
    slotMaxTime: '22:00:00',
    hiddenDays: [0, 6],
    locale: 'es',
  };

  constructor(private entrenadorService: EntrenadorService) {}

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

  handleDateClick(arg: any) {
    // manejar el clic en una fecha del calendario
    alert('Date clicked: ' + arg.dateStr);
  }
}
