import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router'; // Importa Router

@Component({
  selector: 'app-set-profile',
  templateUrl: './set-profile.component.html',
  styleUrls: ['./set-profile.component.css'],
})
export class SetProfileComponent {
  isJugadorSelected: boolean = false;
  isEntrenadorSelected: boolean = false;
  codigoJugador: string = '';

  constructor(
    private authService: AuthService,
    private router: Router // Inyecta Router
  ) {}

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
        // Redirige según el tipo de perfil
        if (datosPerfil.tipoUsuario === 'jugador') {
          this.router.navigate(['/jugador-home']);
        } else if (datosPerfil.tipoUsuario === 'entrenador') {
          this.router.navigate(['/entrenador-home']);
        }
      },
      error: (error) => {
        console.error('Error al establecer el perfil:', error);
      },
    });
  }
}
