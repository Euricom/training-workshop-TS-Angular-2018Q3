import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EngineHttpClient {
  constructor(private http: HttpClient) {}
  getHorsePower() {
    return 150;
  }
  getName() {
    return 'Basic engine';
  }

  getModels(): Observable<Array<any>> {
    return this.http.get<Array<any>>('api/models');
  }
}
