import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class JugadorGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // Usamos 'pipe' y 'map' para manejar el Observable retornado por obtenerTipoPerfil
    return this.authService.obtenerTipoPerfil().pipe(
      map((tipoUsuario) => {
        if (tipoUsuario === 'jugador') {
          // Si el usuario es un entrenador, permitimos la activación de la ruta
          return true;
        } else {
          // Si no es un entrenador, redirigimos al usuario a la página de inicio y evitamos la activación de la ruta
          this.router.navigate(['/']);
          return false;
        }
      }),
      catchError(() => {
        // En caso de error, redirigimos al usuario y evitamos la activación de la ruta
        this.router.navigate(['/']);
        return of(false);
      })
    );
  }
}
