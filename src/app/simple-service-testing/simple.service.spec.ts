import { TestBed } from '@angular/core/testing';

import { SimpleService } from './simple.service';
import { CheckValueService } from './check-value.service';

describe('SimpleService', () => {
  let service: SimpleService;
  const fakeCheckValueService = { check: () => true };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SimpleService,
        { provide: CheckValueService, useValue: fakeCheckValueService }
      ]
    });

    service = TestBed.inject(SimpleService);
  });

  it('should create an instance', () => {
    expect(service).toBeTruthy();
  });

  it('should sum two numbers', () => {
    const sum = service.sum(1, 2);
    expect(sum).toBe(3);
  });
  //
  it('should return undefined, if no second argument provided', () => {
    const sum = service.sum(1);
    expect(sum).toBeUndefined();
  });
  //
  it('should return 22, if no first argument provided', () => {
    const sum = service.sum(undefined, 2);
    expect(sum).toBe(22);
  });
  //
  it('should check value', () => {
    const value = service.check();
    expect(value).toBeTruthy();
  });
});
