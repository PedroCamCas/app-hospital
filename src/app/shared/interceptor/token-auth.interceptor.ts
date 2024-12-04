import { HttpRequest, HttpHandler, HttpEvent, HttpHandlerFn } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

export function authInterceptorFn(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {

  if (req.url.includes('/login') || req.url.includes('/register')) {
    return next(req);
  }

  const token = localStorage.getItem('token');

  if (!token) {
    console.error('Token no encontrado. Redirigiendo al inicio de sesión.');
    const router = Injector.create({ providers: [{ provide: Router, useClass: Router }] }).get(Router);
    router.navigate(['/login']);
    return throwError(() => new Error('No se encontró el token. Usuario no autenticado.'));
  }

  const clonedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(clonedRequest).pipe(
    catchError((error) => {
      console.error('Error en la solicitud:', error);

      if (error.status === 401) {
        console.error('No autorizado. Redirigiendo al inicio de sesión.');
        const router = Injector.create({ providers: [{ provide: Router, useClass: Router }] }).get(Router);
        router.navigate(['/login']);
      }

      return throwError(() => new Error(error.message || 'Error en la solicitud HTTP'));
    })
  );
}
