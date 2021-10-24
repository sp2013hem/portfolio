import { TestBed } from '@angular/core/testing';

import { CheckSignedInGuard } from './check-signed-in.guard';

describe('CheckSignedInGuard', () => {
  let guard: CheckSignedInGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CheckSignedInGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
