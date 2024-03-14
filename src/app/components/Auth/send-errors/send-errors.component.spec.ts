import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendErrorsComponent } from './send-errors.component';

describe('SendErrorsComponent', () => {
  let component: SendErrorsComponent;
  let fixture: ComponentFixture<SendErrorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendErrorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
