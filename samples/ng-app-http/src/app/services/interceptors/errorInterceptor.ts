import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CommunicationError, RequestError } from '../../errors';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).timeout(2000).catch(err => castError(err));
  }
}

function castError(error: HttpErrorResponse | Error) {
  if (error instanceof Error) {
    if (error.name === 'TimeoutError') {
      return Observable.throw(new CommunicationError('Request Timeout'));
    }
    return Observable.throw(
      new CommunicationError('Failed to process server response')
    );
  }
  // HttpErrorResponse
  if (error.status == 0) {
    // A network error occurred (DNS, No Internet, ...)
    return Observable.throw(new CommunicationError('No connection'));
  }
  // The backend returned an unsuccessful response code.
  return Observable.throw(
    new RequestError(error.status, error.statusText, error)
  );
}
