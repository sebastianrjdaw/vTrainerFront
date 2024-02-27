import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JugadorHomeComponent } from './jugador-home.component';

describe('JugadorHomeComponent', () => {
  let component: JugadorHomeComponent;
  let fixture: ComponentFixture<JugadorHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JugadorHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JugadorHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
