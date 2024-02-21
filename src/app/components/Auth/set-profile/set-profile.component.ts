import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service'; // Ajusta la ruta según la ubicación de tu servicio

@Component({
  selector: 'app-set-profile',
  templateUrl: './set-profile.component.html',
  styleUrls: ['./set-profile.component.css'],
})
export class SetProfileComponent {
  isJugadorSelected: boolean = false;
  isEntrenadorSelected: boolean = false;
  codigoJugador: string = ''; // Propiedad para el binding del input

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

  verificarCodigo(): void {
    this.authService.verificarCodigoJugador(this.codigoJugador).subscribe({
      next: (response) => {
        console.log('Código verificado con éxito:', response);
        // Manejo de la respuesta exitosa
      },
      error: (error) => {
        console.error('Error al verificar el código:', error);
        // Manejo del error
      },
    });
  }
  gestionarEquipoAmateur(): void {
    this.authService.establecerPerfilEntrenador().subscribe({
      next: (response) => {
        console.log('Perfil de entrenador establecido:', response);
        // Aquí puedes manejar la respuesta exitosa, como redireccionar o mostrar un mensaje
      },
      error: (error) => {
        console.error('Error al establecer el perfil de entrenador:', error);
        // Manejar el error, por ejemplo, mostrando un mensaje al usuario
      },
    });
  }
}
