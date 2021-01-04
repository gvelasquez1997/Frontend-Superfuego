import { TestBed } from '@angular/core/testing';

import { CuartoBombasService } from './cuarto-bombas.service';

describe('CuartoBombasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CuartoBombasService = TestBed.get(CuartoBombasService);
    expect(service).toBeTruthy();
  });
});
