import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/Auth/login/login.component';
import { RegisterComponent } from './components/Auth/register/register.component';
import { SetProfileComponent } from './components/Auth/set-profile/set-profile.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { JugadorHomeComponent } from './components/jugador/jugador-home/jugador-home.component';
import { EntrenadorHomeComponent } from './components/entrenador/entrenador-home/entrenador-home.component';
const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'set-profile', component: SetProfileComponent },
  { path: 'jugador-home', component: JugadorHomeComponent },
  { path: 'entrenador', component: EntrenadorHomeComponent },
  {
    path: 'entrenador',
    loadChildren: () =>
      import('./components/entrenador/entrenador.module').then(
        (m) => m.EntrenadorModule
      ),
  },
  {
    path: 'jugador',
    loadChildren: () =>
      import('./components/jugador/jugador.module').then(
        (m) => m.JugadorModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule],
})
export class AppRoutingModule {}
