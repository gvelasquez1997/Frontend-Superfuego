import { TestBed } from '@angular/core/testing';

import { SenialService } from './senial.service';

describe('SenialService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SenialService = TestBed.get(SenialService);
    expect(service).toBeTruthy();
  });
});
