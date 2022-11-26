import { TestBed } from '@angular/core/testing';

import { CheckoutGuardService } from './checkout-guard.service';

describe('CheckoutGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckoutGuardService = TestBed.get(CheckoutGuardService);
    expect(service).toBeTruthy();
  });
});
