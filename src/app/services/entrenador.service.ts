import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Jugador, Posicion } from '../interfaces/entrenador';
@Injectable({
  providedIn: 'root',
})
export class EntrenadorService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene la información del equipo asociado al entrenador autenticado.
   * @returns Observable con la información del equipo o un valor falso si no hay equipo.
   */
  obtenerMiEquipo(): Observable<any> {
    return this.http.get(`${this.apiUrl}/mi-equipo`);
  }

  crearEquipo(equipoData: any) {
    let endPoint = '/create-equipo';
    return this.http.post(this.apiUrl + endPoint, equipoData);
  }
  actualizarEquipo(equipoData: any) {
    let endPoint = '/update-equipo';
    return this.http.post(this.apiUrl + endPoint, equipoData);
  }

  obtenerJugadores(): Observable<Jugador[]> {
    return this.http.get<Jugador[]>(`${this.apiUrl}/jugadores-equipo`);
  }

  obtenerPosiciones(): Observable<Posicion[]> {
    return this.http.get<any[]>(`${this.apiUrl}/posiciones`);
  }

  crearJugador(jugador: Jugador): Observable<Jugador> {
    return this.http.post<Jugador>(`${this.apiUrl}/create-jugador`, jugador);
  }

  actualizarJugador(id: number, jugador: Jugador): Observable<any> {
    jugador.id = id;
    return this.http.post(`${this.apiUrl}/update-jugador/`, jugador);
  }

  eliminarJugador(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/jugadores/${id}`);
  }
}
