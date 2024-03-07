import { Component, OnInit } from '@angular/core';
import { EntrenadorService } from 'src/app/services/entrenador.service';
import { Router } from '@angular/router';
import { Equipo } from 'src/app/interfaces/entrenador';
@Component({
  selector: 'app-entrenador-home',
  templateUrl: './entrenador-home.component.html',
  styleUrls: ['./entrenador-home.component.css'],
})
export class EntrenadorHomeComponent implements OnInit {
  equipo!: Equipo;

  constructor(
    private entrenadorService: EntrenadorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.entrenadorService.obtenerMiEquipo().subscribe(
      (data) => {
        if (data.equipo) {
          this.equipo = data.equipo;
          console.log(this.equipo.nombre);
        }
      },
      (error) => {
        console.error('Error al obtener la información del equipo:', error);
        this.router.navigate(['entrenador/equipo']);
      }
    );
  }
}
