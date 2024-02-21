import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api'; // Base URL for your API

  constructor(private http: HttpClient, private router: Router) {}

  login(loginData: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, loginData);
  }

  setPerfil(codigoJugador: string): Observable<any> {
    const body = {
      tipoUsuario: 'jugador',
      codigo_jugador: codigoJugador,
    };
    return this.http.post(`${this.apiUrl}/set-perfil`, body);
  }

  verificarCodigoJugador(codigoJugador: string): Observable<any> {
    const body = {
      tipoUsuario: 'jugador',
      codigo_jugador: codigoJugador,
    };
    return this.http.post(`${this.apiUrl}/set-perfil`, body);
  }

  establecerPerfilEntrenador(): Observable<any> {
    const body = {
      tipoUsuario: 'entrenador',
    };
    return this.http.post(`${this.apiUrl}/set-perfil`, body);
  }

  handleLoginSuccess() {
    console.log('Redireccionando');
    // this.router.navigate(['/ruta-despues-login']); // Ajusta la ruta según tu aplicación
  }

  handleLoginError() {
    alert('Usuario o contraseña incorrectos');
  }
}
