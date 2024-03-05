import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { RegisterData } from '../interfaces/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isValidToken() {
    throw new Error('Method not implemented.');
  }
  getPerfil() {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Inicia sesión de un usuario y almacena el token de autenticación.
   * @param loginData Los datos de inicio de sesión del usuario.
   * @returns Observable con la respuesta del servidor.
   */
  login(loginData: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, loginData);
  }

  /**
   * Registra un nuevo usuario en el sistema.
   * @param userData Los datos del nuevo usuario.
   * @returns Observable con la respuesta del servidor.
   */
  register(userData: RegisterData): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  /**
   * Establece el perfil del usuario en el sistema.
   * @param datosPerfil Los datos del perfil del usuario.
   * @returns Observable con la respuesta del servidor.
   */
  establecerPerfil(datosPerfil: {
    tipoUsuario: string;
    codigo_jugador?: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/set-perfil`, datosPerfil);
  }

  /**
   * Maneja la redirección después de un inicio de sesión exitoso.
   */
  handleLoginSuccess(): void {
    console.log('Redireccionando');
    this.router.navigate(['/ruta-despues-login']); // Ajusta la ruta según tu aplicación
  }

  /**
   * Maneja el error de inicio de sesión mostrando una alerta al usuario.
   */
  handleLoginError(): void {
    alert('Usuario o contraseña incorrectos');
  }

  /**
   * Obtiene el tipo de perfil del usuario y redirige a la ruta correspondiente.
   * Si no tiene perfil, redirige a la ruta para establecer el perfil.
   */
  obtenerTipoPerfilYRedirigir(): void {
    const token = localStorage.getItem('authToken');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    this.http
      .get(`${this.apiUrl}/get-perfil`)
      .pipe(
        map((response: any) => response.Perfil.tipoUsuario),
        catchError((error) => {
          console.error(error);
          return of(null); // En caso de error, retornamos null
        })
      )
      .subscribe((tipoUsuario) => {
        this.redirigirSegunTipoUsuario(tipoUsuario);
      });
  }

  /**
   * Redirige al usuario a la página correspondiente según su tipo de usuario.
   * @param tipoUsuario El tipo de usuario para la redirección.
   */
  private redirigirSegunTipoUsuario(tipoUsuario: string | null): void {
    if (tipoUsuario) {
      switch (tipoUsuario) {
        case 'jugador':
          this.router.navigate(['/jugador']);
          break;
        case 'entrenador':
          this.router.navigate(['/entrenador/main']);
          break;
        default:
          this.router.navigate(['/set-profile']);
          break;
      }
    } else {
      this.router.navigate(['/set-profile']);
    }
  }
}
