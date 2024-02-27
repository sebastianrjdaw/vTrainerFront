import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrenadorHomeComponent } from './entrenador-home.component';

describe('EntrenadorHomeComponent', () => {
  let component: EntrenadorHomeComponent;
  let fixture: ComponentFixture<EntrenadorHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntrenadorHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntrenadorHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
