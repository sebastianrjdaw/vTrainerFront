import { TestBed } from '@angular/core/testing';

import { EntrenadorGuard } from './entrenador.guard';

describe('EntrenadorGuard', () => {
  let guard: EntrenadorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EntrenadorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
