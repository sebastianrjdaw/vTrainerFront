export interface Equipo {
  id?: number;
  competicion: string;
  nombre: string;
  ubicacion: string;
}

export interface Jugador {
  id: number;
  nombre: string;
  apellidos: string;
  dorsal: number;
  altura: number;
  posicion_id: number;
  codigo_jugador: number;
  activo: boolean;
}
export interface Posicion {
  id: number;
  nombre: string;
}
