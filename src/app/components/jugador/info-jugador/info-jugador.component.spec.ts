import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoJugadorComponent } from './info-jugador.component';

describe('InfoJugadorComponent', () => {
  let component: InfoJugadorComponent;
  let fixture: ComponentFixture<InfoJugadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoJugadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoJugadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
