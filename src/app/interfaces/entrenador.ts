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

export interface Etiqueta {
  id?: number;
  titulo: string;
}

export interface Entrenamiento {
  id: number;
  titulo: string;
  cuerpo: string;
  etiquetas: Etiqueta[];
}

export interface Sesion {
  id?: number;
  fecha: string;
  hora_inicio: string;
  hora_fin: string;
  entrenamientos: number[];
}
