import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { timeout, catchError } from 'rxjs/operators';

import { CommunicationError, RequestError } from '../../errors';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    console.log('ErrorInterceptor');
    return next.handle(req).pipe(
      timeout(2000),
      catchError((err) => castError(err)),
    );
  }
}

function castError(error: HttpErrorResponse | Error) {
  if (error instanceof Error) {
    if (error.name === 'TimeoutError') {
      return throwError(new CommunicationError('Request Timeout'));
    }
    return throwError(
      new CommunicationError('Failed to process server response'),
    );
  }
  // HttpErrorResponse
  if (error.status === 0) {
    // A network error occurred (DNS, No Internet, ...)
    return throwError(new CommunicationError('No connection'));
  }
  // The backend returned an unsuccessful response code.
  return throwError(new RequestError(error.status, error.statusText, error));
}
