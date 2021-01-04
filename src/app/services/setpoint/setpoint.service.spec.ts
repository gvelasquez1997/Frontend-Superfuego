import { TestBed } from '@angular/core/testing';

import { SetpointService } from './setpoint.service';

describe('SetpointService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SetpointService = TestBed.get(SetpointService);
    expect(service).toBeTruthy();
  });
});
