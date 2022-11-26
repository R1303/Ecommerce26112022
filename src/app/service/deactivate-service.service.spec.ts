import { TestBed } from '@angular/core/testing';

import { DeactivateServiceService } from './deactivate-service.service';

describe('DeactivateServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeactivateServiceService = TestBed.get(DeactivateServiceService);
    expect(service).toBeTruthy();
  });
});
