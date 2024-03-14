import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JugadorSesionesComponent } from './jugador-sesiones.component';

describe('JugadorSesionesComponent', () => {
  let component: JugadorSesionesComponent;
  let fixture: ComponentFixture<JugadorSesionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JugadorSesionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JugadorSesionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
