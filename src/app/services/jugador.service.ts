import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Equipo, Sesion } from '../interfaces/entrenador';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class JugadorService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  getSesionesUsuario(): Observable<Sesion[]> {
    return this.http.get<Sesion[]>(`${this.apiUrl}/sesiones-user`);
  }

  getEquipo(): Observable<Equipo> {
    return this.http.get<Equipo>(`${this.apiUrl}/sesiones-semana`);
  }
}
