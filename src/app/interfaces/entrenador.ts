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

export interface EventoCalendario {
  title: string;
  start: string;
  end: string;
  extendedProps: any; // Asumiendo que extendedProps es un diccionario
}

export interface EventosPorDia {
  [fecha: string]: EventoCalendario[];
}

export interface InfoJugador {
  nombre: string;
  apellidos: string;
  posicion: string; // Parece haber un typo en el JSON proporcionado, debería ser "posicion"
  dorsal: number;
  altura: number;
  equipo: Equipo;
}
