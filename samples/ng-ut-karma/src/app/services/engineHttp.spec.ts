import { TestBed, inject, async } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { EngineHttpClient } from './engineHttp';

describe('EngineHttpClient', () => {
  let httpMock: HttpTestingController;
  let engine: EngineHttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EngineHttpClient],
      imports: [HttpClientTestingModule],
    });
  });

  beforeEach(inject(
    [EngineHttpClient, HttpTestingController],
    (_engine: EngineHttpClient, _httpMock: HttpTestingController) => {
      httpMock = _httpMock;
      engine = _engine;
    }
  ));

  afterEach(() => {
    httpMock.verify();
  });

  it('should work', () => {
    // action
    engine.getModels().subscribe(models => {
      expect(models.length).toBe(2);
      expect(models[0]).toEqual('aaaaa');
    });

    // verify
    const req = httpMock.expectOne('api/models');
    expect(req.request.method).toEqual('GET');

    // fulfill the request by transmitting a response.
    req.flush(['aaaaa', 'bbbbb']);
  });
});
