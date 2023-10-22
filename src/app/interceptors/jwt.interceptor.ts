import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, take, throwError } from 'rxjs';
import { User } from '@app/models/Identity/User';
import { DataService } from '@app/Service/service.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private data: DataService,) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let currentUserInt: User | null;

    const currentUserJSON = localStorage.getItem('user');

    if(currentUserJSON !== null) {
      currentUserInt = JSON.parse(currentUserJSON);
      if (currentUserInt) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${currentUserInt.token}`
          }
        });
      }
    }
    
    return next.handle(request).pipe(
      catchError(error => {
        if (error) {
          localStorage.removeItem('user')
        }
        return throwError(error);
      })
    );
  }
}
