import { TestBed } from '@angular/core/testing';

import { JugadorGuard } from './jugador.guard';

describe('JugadorGuard', () => {
  let guard: JugadorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(JugadorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
