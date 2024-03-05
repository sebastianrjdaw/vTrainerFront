import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  // Aquí puedes agregar más métodos relacionados con las acciones del entrenador.
}
