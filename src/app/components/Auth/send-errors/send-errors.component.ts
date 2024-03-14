import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-send-errors',
  templateUrl: './send-errors.component.html',
  styleUrls: ['./send-errors.component.css'],
})
export class SendErrorsComponent {
  reporteErrorForm: FormGroup;

  constructor(private authService: AuthService) {
    this.reporteErrorForm = new FormGroup({
      mensaje: new FormControl('', [Validators.required]),
    });
  }

  onReportarError() {
    if (this.reporteErrorForm.valid) {
      const mensajeError = {
        mensaje: this.reporteErrorForm.value.mensaje,
        tipo: 'BUG',
        estado: 0,
      };
      this.authService.createMensaje(mensajeError).subscribe(
        (response) => {
          Swal.fire({
            title: 'Error Reportado!',
            icon: 'success',
          }).then((result) => {
            if (result.isConfirmed) {
              window.history.back();
            }
          });
        },
        (error) => {
          // Aquí iría la lógica para manejar el error al enviar el mensaje.
          console.error('Error al enviar el mensaje de error', error);
        }
      );
    }
  }
}
