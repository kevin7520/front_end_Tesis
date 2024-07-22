import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { NotificationService } from '../shared/services/notificacion.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor  {
 constructor(private notificationService: NotificationService, private roter: Router) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 0) {
          this.roter.navigateByUrl('/login');
          this.notificationService.showError('No autorizado. Por favor, inicie sesión nuevamente.');
        }
        return throwError(error);
      })
    );
  }
}
