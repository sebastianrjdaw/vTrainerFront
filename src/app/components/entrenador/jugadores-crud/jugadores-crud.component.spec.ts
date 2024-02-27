import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JugadoresCrudComponent } from './jugadores-crud.component';

describe('JugadoresCrudComponent', () => {
  let component: JugadoresCrudComponent;
  let fixture: ComponentFixture<JugadoresCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JugadoresCrudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JugadoresCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
