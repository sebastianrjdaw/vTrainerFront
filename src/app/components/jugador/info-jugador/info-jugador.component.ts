import { Component, OnInit } from '@angular/core';
import { InfoJugador } from 'src/app/interfaces/entrenador';
import { JugadorService } from 'src/app/services/jugador.service';

@Component({
  selector: 'app-info-jugador',
  templateUrl: './info-jugador.component.html',
  styleUrls: ['./info-jugador.component.css'],
})
export class InfoJugadorComponent implements OnInit {
  jugador: InfoJugador | undefined; // Declara una propiedad para almacenar la información del jugador

  constructor(private jugadorService: JugadorService) {}

  ngOnInit(): void {
    // Mueve la llamada al servicio aquí, dentro del método ngOnInit
    this.jugadorService.getInfo().subscribe({
      next: (jugador: InfoJugador) => {
        console.log(jugador);
        this.jugador = jugador; // Asigna los datos del jugador a la propiedad del componente
        // Ahora puedes usar la propiedad 'jugador' en tu plantilla HTML para mostrar la información
      },
      error: (error: any) => console.error(error),
    });
  }
}
