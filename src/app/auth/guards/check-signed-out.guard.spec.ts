import { TestBed } from '@angular/core/testing';

import { CheckSignedOutGuard } from './check-signed-out.guard';

describe('CheckSignedOutGuard', () => {
  let guard: CheckSignedOutGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CheckSignedOutGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
