import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { LoginData } from 'src/app/interfaces/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup = this.fb.group(
    {
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', [Validators.required]],
    },
    { validator: this.checkPasswords }
  );

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  checkPasswords(group: FormGroup): any {
    const pass = group.get('password')?.value;
    const confirmPass = group.get('password_confirmation')?.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  register(): void {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          const loginData: LoginData = {
            email: this.registerForm.value.email,
            password: this.registerForm.value.password,
          };

          this.authService.login(loginData).subscribe({
            next: (response) => {
              // Almacena el token recibido
              localStorage.setItem('authToken', response.access_token);
              this.router.navigate(['/set-profile']);
            },
            error: (error) => console.error('Error al iniciar sesión', error),
          });
        },
        error: (error) => console.error('Error al registrar', error),
      });
    }
  }
}
