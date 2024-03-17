import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Equipo } from 'src/app/interfaces/entrenador';
import { EntrenadorService } from 'src/app/services/entrenador.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css'],
})
export class EquipoComponent implements OnInit {
  equipo: Equipo = {
    nombre: '',
    competicion: '',
    ubicacion: '',
  };
  esEdicion: boolean = false;
  equipoForm = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    competicion: new FormControl('', [Validators.required]),
    ubicacion: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
  });

  constructor(
    private entrenadorService: EntrenadorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.entrenadorService.obtenerMiEquipo().subscribe(
      (data: any) => {
        if (data.equipo) {
          this.esEdicion = true;
          this.equipo = data.equipo;
          this.equipoForm.patchValue(this.equipo); // Rellena el formulario con los datos del equipo
        }
      },
      (error) => {
        Swal.fire({
          title: 'Bienvenido',
          text: 'Antes de comenzar, debes registrar tu equipo.',
          icon: 'info',
          confirmButtonText: 'Aceptar',
        });
      }
    );
  }

  onSubmit() {
    if (this.equipoForm.valid) {
      if (this.equipo.nombre.length > 0) {
        // Actualizar equipo existente
        this.entrenadorService
          .actualizarEquipo(this.equipoForm.value)
          .subscribe(
            (response: any) => {
              Swal.fire({
                title: '¡Éxito!',
                text: 'Equipo actualizado correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar',
              });
              // Aquí podrías redireccionar o mostrar un mensaje de éxito
            },
            (error: any) => {
              Swal.fire({
                title: 'Error',
                text: 'Hubo un error al actualizar el equipo',
                icon: 'error',
                confirmButtonText: 'Aceptar',
              });
            }
          );
      } else {
        // Crear nuevo equipo
        this.entrenadorService.crearEquipo(this.equipoForm.value).subscribe(
          (response: any) => {
            Swal.fire({
              title: '¡Éxito!',
              text: 'Equipo creado correctamente',
              icon: 'success',
              confirmButtonText: 'Aceptar',
            });
            this.router.navigate(['entrenador/main']);
          },
          (error: any) => {
            Swal.fire({
              title: 'Error',
              text: 'Hubo un error al crear el equipo',
              icon: 'error',
              confirmButtonText: 'Aceptar',
            });
          }
        );
      }
    } else {
      Swal.fire({
        title: 'Información incompleta',
        text: 'Por favor, completa todos los campos requeridos del formulario.',
        icon: 'info',
        confirmButtonText: 'Aceptar',
      });
    }
  }
}
