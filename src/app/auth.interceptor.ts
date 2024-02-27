// src/app/interceptors/auth.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Obtén el token de alguna parte, como localStorage
    const authToken = localStorage.getItem('authToken');
    console.log('Token de autenticación:', authToken); // Imprime el token por consola

    // Clona la solicitud para agregarle el nuevo header.
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`),
    });

    // Envía la solicitud clonada con el header de autorización.
    return next.handle(authReq);
  }
}
