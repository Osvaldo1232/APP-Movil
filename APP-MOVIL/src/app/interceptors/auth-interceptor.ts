import { inject, Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpInterceptorFn } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiciosApi } from '../Servicios/servicios-api';



export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const loginService = inject(ServiciosApi);
  const token = loginService.getToken();

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned);
  }

  return next(req);
};

