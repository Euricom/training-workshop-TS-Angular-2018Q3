import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, timeout } from 'rxjs/operators';
import { CommunicationError, RequestError } from '../errors';

interface ITask {
  id: number;
  name: string;
  completed: boolean;
}

export class Task {
  id: number;
  name: string;
  completed: boolean;

  constructor(data: ITask) {
    Object.assign(this, data);
  }
  setCompleted() {
    return (this.completed = true);
  }
}

@Injectable()
export class TaskService {
  constructor(private httpClient: HttpClient) {}
  getTasks(): Observable<Task[]> {
    return this.httpClient.get<ITask[]>('http://localhost:3000/tasks').pipe(
      map((data) => data.map((item) => new Task(item))),
      timeout(5000),
      catchError((err) => castError(err)),
    );
  }
}

function castError(error: HttpErrorResponse | Error) {
  if (error instanceof Error) {
    if (error.name === 'TimeoutError') {
      return Observable.throw(new CommunicationError('Request Timeout'));
    }
    return Observable.throw(
      new CommunicationError('Failed to process server response'),
    );
  }
  // HttpErrorResponse
  if (error.status === 0) {
    // A network error occurred (DNS, No Internet, ...)
    return Observable.throw(new CommunicationError('No connection'));
  }
  // The backend returned an unsuccessful response code.
  return Observable.throw(
    new RequestError(error.status, error.statusText, error),
  );
}
