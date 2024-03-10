import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Jugador, Posicion } from 'src/app/interfaces/entrenador';
import { EntrenadorService } from 'src/app/services/entrenador.service';

@Component({
  selector: 'app-jugadores-crud',
  templateUrl: './jugadores-crud.component.html',
  styleUrls: ['./jugadores-crud.component.css'],
})
export class JugadoresCrudComponent implements OnInit {
  mostrarFormulario: boolean = false;
  esEdicion: boolean = false;
  jugadores: Jugador[] = []; // Aquí tendrás la lista de jugadores
  jugadorForm: FormGroup; // Este será tu formulario para crear o editar jugadores
  posiciones: Posicion[] = [];
  jugadorIdEdit: number = 0;

  constructor(private entrenadorService: EntrenadorService) {
    // Inicializa tu formulario aquí
    this.jugadorForm = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      apellidos: new FormControl('', [Validators.required]),
      dorsal: new FormControl('', [Validators.required, Validators.min(1)]),
      altura: new FormControl('', [Validators.required]),
      posicion_id: new FormControl('', [Validators.required]),
      // No incluimos codigo_jugador ni activo ya que mencionaste que no son CRUD
    });
  }

  ngOnInit(): void {
    this.cargarJugadores();
    this.cargarPosiciones();
  }

  cargarJugadores(): void {
    // Aquí llamas al servicio para obtener todos los jugadores y los asignas a la variable jugadores
    this.entrenadorService.obtenerJugadores().subscribe({
      next: (data: any) => {
        this.jugadores = data.jugadores; // Asumiendo que tu servicio retorna un array de jugadores
      },
      error: (err) => console.error(err),
    });
  }

  cargarPosiciones(): void {
    // Aquí llamas al servicio para obtener todos los jugadores y los asignas a la variable jugadores
    this.entrenadorService.obtenerPosiciones().subscribe({
      next: (data: any) => {
        this.posiciones = data.posiciones; // Asumiendo que tu servicio retorna un array de jugadores
      },
      error: (err) => console.error(err),
    });
  }

  mostrarFormularioCrear(): void {
    this.mostrarFormulario = true;
    this.esEdicion = false;
    this.jugadorForm.reset();
  }

  ocultarFormulario(): void {
    this.mostrarFormulario = false;
  }

  editarJugador(jugador: Jugador): void {
    this.jugadorIdEdit = jugador.id;
    this.mostrarFormulario = true;
    this.esEdicion = true;
    this.jugadorForm.patchValue(jugador);
  }

  borrarJugador(jugadorId: number): void {
    // Llamar al servicio para borrar el jugador
    this.entrenadorService.eliminarJugador(jugadorId).subscribe({
      next: (response) => {
        // Eliminar el jugador de la lista local para no tener que recargar desde el servidor
        this.jugadores = this.jugadores.filter((j) => j.id !== jugadorId);
      },
      error: (err) => console.error(err),
    });
  }
  getPosicionNombre(posicionId: number): string {
    const posicion = this.posiciones.find((p) => p.id === posicionId);
    return posicion ? posicion.nombre : 'No especificado';
  }

  onSubmit(): void {
    if (this.jugadorForm.valid) {
      if (this.esEdicion) {
        const jugadorData: Jugador = this.jugadorForm.value;
        jugadorData.id = this.jugadorIdEdit; // Asegúrate de que tienes el ID correcto asignado
        this.entrenadorService
          .actualizarJugador(jugadorData.id, jugadorData)
          .subscribe({
            next: (response) => {
              // Actualizar la lista de jugadores o mostrar mensaje de éxito
              this.cargarJugadores(); // O actualizar solo el jugador editado
              this.mostrarFormulario = false;
            },
            error: (error) =>
              console.error('Error al actualizar jugador', error),
          });
      } else {
        // Lógica para crear un nuevo jugador
        this.entrenadorService.crearJugador(this.jugadorForm.value).subscribe({
          next: (response) => {
            // Agregar el nuevo jugador a la lista o mostrar mensaje de éxito
            this.jugadores.push(response);
            this.mostrarFormulario = false;
          },
          error: (error) => console.error('Error al crear jugador', error),
        });
      }
    }
  }

  volver(): void {
    this.mostrarFormulario = false;
  }
}
