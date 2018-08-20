import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { Engine } from './engine';
import { Car } from './car';

describe('Car', () => {
  let subject: Car;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Engine, Car],
    });
    spyOn(Engine.prototype, 'getHorsePower').and.returnValue(400);
    spyOn(Engine.prototype, 'getName').and.returnValue('V8 engine');
  });
  afterEach(() => {
    // jest.resetAllMocks();
  });

  beforeEach(inject([Car], (car: Car) => {
    subject = car;
  }));

  it('should display name with engine', () => {
    expect(subject.getName()).toBe('Car with V8 engine(400 HP)');
  });

  it('should display name with engine', () => {
    expect(subject.getName()).toBe('Car with V8 engine(400 HP)');
  });
});
