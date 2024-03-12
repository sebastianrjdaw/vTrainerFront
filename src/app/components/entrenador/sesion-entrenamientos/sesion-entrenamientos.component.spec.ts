import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SesionEntrenamientosComponent } from './sesion-entrenamientos.component';

describe('SesionEntrenamientosComponent', () => {
  let component: SesionEntrenamientosComponent;
  let fixture: ComponentFixture<SesionEntrenamientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SesionEntrenamientosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SesionEntrenamientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
