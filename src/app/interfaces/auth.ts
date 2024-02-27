export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface Perfil {
  user_id: number;
  esPremium: boolean;
  tipoUsuario: 'jugador' | 'entrenador';
  created_at: string;
  updated_at: string;
}
