import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Equipo } from 'src/app/interfaces/entrenador';
import { EntrenadorService } from 'src/app/services/entrenador.service';
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
      Validators.minLength(3),
    ]),
  });

  constructor(private entrenadorService: EntrenadorService) {}

  ngOnInit(): void {
    this.entrenadorService.obtenerMiEquipo().subscribe((data: any) => {
      if (data.equipo) {
        this.esEdicion = true;
        this.equipo = data.equipo;
        this.equipoForm.patchValue(this.equipo); // Rellena el formulario con los datos del equipo
      }
    });
  }

  onSubmit() {
    if (this.equipoForm.valid) {
      if (this.equipo) {
        // Actualizar equipo existente
        this.entrenadorService
          .actualizarEquipo(this.equipoForm.value)
          .subscribe(
            (response: any) => {
              console.log('Equipo actualizado', response);
              // Aquí podrías redireccionar o mostrar un mensaje de éxito
            },
            (error: any) => {
              console.log(this.equipoForm.value);
              console.error('Error al actualizar equipo', error);
            }
          );
      } else {
        // Crear nuevo equipo
        this.entrenadorService.crearEquipo(this.equipoForm.value).subscribe(
          (response: any) => {
            console.log('Equipo creado', response);
            // Aquí podrías redireccionar o mostrar un mensaje de éxito
          },
          (error: any) => {
            console.error('Error al crear equipo', error);
          }
        );
      }
    }
  }

  volver() {
    window.history.back();
  }
}
