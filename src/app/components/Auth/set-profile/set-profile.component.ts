import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-set-profile',
  templateUrl: './set-profile.component.html',
  styleUrls: ['./set-profile.component.css'],
})
export class SetProfileComponent {
  isJugadorSelected: boolean = false;
  isEntrenadorSelected: boolean = false;
  codigoJugador: string = '';

  constructor(private authService: AuthService) {}

  selectJugador(): void {
    this.isJugadorSelected = true;
    this.isEntrenadorSelected = false;
  }

  selectEntrenador(): void {
    this.isEntrenadorSelected = true;
    this.isJugadorSelected = false;
  }

  resetSelection(): void {
    this.isJugadorSelected = false;
    this.isEntrenadorSelected = false;
  }

  confirmarSeleccion(): void {
    let datosPerfil = {
      tipoUsuario: this.isJugadorSelected ? 'jugador' : 'entrenador',
      codigo_jugador: this.codigoJugador || undefined,
    };

    this.authService.establecerPerfil(datosPerfil).subscribe({
      next: (response) => {
        console.log(`${datosPerfil.tipoUsuario} perfil establecido:`, response);
        this.resetSelection(); // Opcionalmente, resetea la selección después de establecer el perfil
      },
      error: (error) => {
        console.error('Error al establecer el perfil:', error);
      },
    });
  }
}
