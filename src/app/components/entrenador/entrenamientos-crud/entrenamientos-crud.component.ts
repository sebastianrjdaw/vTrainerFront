import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Entrenamiento, Etiqueta } from 'src/app/interfaces/entrenador';
import { EntrenadorService } from 'src/app/services/entrenador.service';

@Component({
  selector: 'app-entrenamientos-crud',
  templateUrl: './entrenamientos-crud.component.html',
  styleUrls: ['./entrenamientos-crud.component.css'],
})
export class EntrenamientosCrudComponent implements OnInit {
  entrenamientoForm: FormGroup;
  mostrarFormulario: boolean = false;
  esEdicion: boolean = false;
  entrenamientosDef: Entrenamiento[] = [];
  entrenamientosUser: Entrenamiento[] = [];
  etiquetas: Etiqueta[] = [];
  idEntrenamientoEdicion?: number;

  constructor(
    private fb: FormBuilder,
    private entrenadorService: EntrenadorService
  ) {
    this.entrenamientoForm = this.fb.group({
      titulo: ['', Validators.required],
      cuerpo: ['', Validators.required],
      etiquetas: [[]],
    });
  }

  ngOnInit(): void {
    this.cargaEntrenamientosDef();
    this.cargaEntrenamientosUser();
    this.cargaEtiquetas();
  }

  cargaEntrenamientosDef() {
    this.entrenadorService.obtenerEntrenamientosDef().subscribe({
      next: (data: any) => {
        this.entrenamientosDef = data.entrenamientos;
      },
    });
  }

  cargaEntrenamientosUser() {
    this.entrenadorService.obtenerEntrenamientosUser().subscribe({
      next: (data: any) => {
        this.entrenamientosUser = data.entrenamientos;
      },
    });
  }
  cargaEtiquetas() {
    this.entrenadorService.obtenerEtiquetas().subscribe({
      next: (data: any) => {
        this.etiquetas = data[0];
        console.log(this.etiquetas);
      },
    });
  }

  mostrarFormularioCrear() {
    this.mostrarFormulario = true;
    this.esEdicion = false;
    this.entrenamientoForm.reset();
  }

  ocultarFormulario() {
    this.mostrarFormulario = false;
  }

  borrarEntrenamiento(id: number) {
    this.entrenadorService.eliminarEntrenamiento(id).subscribe(
      () => {
        this.entrenamientosUser = this.entrenamientosUser.filter(
          (entrenamiento) => entrenamiento.id !== id
        );
      },
      (error) => {
        console.error('Error al eliminar el entrenamiento', error);
      }
    );
  }

  editarEntrenamiento(entrenamiento: Entrenamiento) {
    this.idEntrenamientoEdicion = entrenamiento.id;
    this.esEdicion = true;
    this.mostrarFormulario = true;

    // Establecer los valores del formulario.
    this.entrenamientoForm.setValue({
      titulo: entrenamiento.titulo,
      cuerpo: entrenamiento.cuerpo,
      // Aquí debes convertir el array de objetos etiquetas a un array de sus ids
      etiquetas: entrenamiento.etiquetas.map((etiqueta) => etiqueta.id),
    });
  }

  onSubmit(): void {
    if (this.entrenamientoForm.valid) {
      console.log(this.entrenamientoForm.value.etiquetas);
      // Convertimos el array de form groups de etiquetas a un array de ids de etiquetas
      const etiquetasIds = this.entrenamientoForm.value.etiquetas;

      const entrenamiento: Entrenamiento = {
        ...this.entrenamientoForm.value,
        etiquetas: etiquetasIds, // Aquí asignamos el array de ids
      };
      if (this.esEdicion && this.idEntrenamientoEdicion) {
        // Actualiza un entrenamiento existente si estamos en modo de edición.
        this.entrenadorService
          .actualizarEntrenamiento(this.idEntrenamientoEdicion, entrenamiento)
          .subscribe({
            next: (response) => {
              // Encuentra el índice del entrenamiento actualizado y reemplázalo.
              const index = this.entrenamientosUser.findIndex(
                (e) => e.id === this.idEntrenamientoEdicion
              );
              if (index !== -1) {
                this.entrenamientosUser[index] = response;
              }
              this.ocultarFormulario();
            },
            error: (error) => {
              console.error('Error al actualizar entrenamiento', error);
            },
          });
      } else {
        // Crear nuevo entrenamiento
        this.entrenadorService.crearEntrenamiento(entrenamiento).subscribe(
          (response) => {
            this.entrenamientosUser.push(entrenamiento);
            this.ocultarFormulario();
          },
          (error) => {
            console.error('Error al crear entrenamiento', error);
          }
        );
      }
    }
  }
}
