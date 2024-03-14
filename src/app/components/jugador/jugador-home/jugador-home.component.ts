import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-jugador-home',
  templateUrl: './jugador-home.component.html',
  styleUrls: ['./jugador-home.component.css'],
})
export class JugadorHomeComponent {
  constructor(private AuthService: AuthService) {}

  logout() {
    this.AuthService.logout();
  }
}
