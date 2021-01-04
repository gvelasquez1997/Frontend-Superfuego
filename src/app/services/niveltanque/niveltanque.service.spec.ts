import { TestBed } from '@angular/core/testing';

import { NiveltanqueService } from './niveltanque.service';

describe('NiveltanqueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NiveltanqueService = TestBed.get(NiveltanqueService);
    expect(service).toBeTruthy();
  });
});
