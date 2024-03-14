import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router'; // Importa Router

@Component({
  selector: 'app-set-profile',
  templateUrl: './set-profile.component.html',
  styleUrls: ['./set-profile.component.css'],
})
export class SetProfileComponent implements OnInit {
  isJugadorSelected: boolean = false;
  isEntrenadorSelected: boolean = false;
  codigoJugador: string = '';

  constructor(
    private authService: AuthService,
    private router: Router // Inyecta Router
  ) {}

  ngOnInit() {
    this.authService.obtenerTipoPerfilYRedirigir();
  }

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
    // Objeto base para los datos del perfil.
    let datosPerfil: any = {
      tipoUsuario: this.isJugadorSelected ? 'jugador' : 'entrenador',
    };

    // Si el usuario es un jugador y ha proporcionado un código de jugador, añádelo al objeto de perfil.
    if (this.isJugadorSelected && this.codigoJugador) {
      datosPerfil['codigo_jugador'] = this.codigoJugador;
    }

    // Llamada al servicio para establecer el perfil.
    this.authService.establecerPerfil(datosPerfil).subscribe({
      next: (response) => {
        console.log(`${datosPerfil.tipoUsuario} perfil establecido:`, response);
        // Redirige según el tipo de usuario.
        this.router.navigate([`/${datosPerfil.tipoUsuario}/main`]);
      },
      error: (error) => {
        console.error('Error al establecer el perfil:', error);
      },
    });
  }
}
