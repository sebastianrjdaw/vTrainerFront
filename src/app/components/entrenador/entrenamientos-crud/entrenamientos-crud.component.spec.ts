import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrenamientosCrudComponent } from './entrenamientos-crud.component';

describe('EntrenamientosCrudComponent', () => {
  let component: EntrenamientosCrudComponent;
  let fixture: ComponentFixture<EntrenamientosCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntrenamientosCrudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntrenamientosCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
