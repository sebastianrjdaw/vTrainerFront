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
  register(userData: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  establecerPerfil(datosPerfil: {
    tipoUsuario: string;
    codigo_jugador?: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/set-perfil`, datosPerfil);
  }

  handleLoginSuccess() {
    console.log('Redireccionando');
    // this.router.navigate(['/ruta-despues-login']); // Ajusta la ruta según tu aplicación
  }

  handleLoginError() {
    alert('Usuario o contraseña incorrectos');
  }
}
