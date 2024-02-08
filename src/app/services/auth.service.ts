// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  login(loginData: { email: string; password: string }): Observable<any> {
    return this.http.post('http://voleytrainerb.ddns.net/api/login', loginData);
  }

  handleLoginSuccess() {
    console.log('Redireccionando');
    // this.router.navigate(['/ruta-despues-login']); // Ajusta la ruta según tu aplicación
  }

  handleLoginError() {
    alert('Usuario o contraseña incorrectos');
  }
}
