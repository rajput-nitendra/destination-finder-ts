import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirportSelectionComponent } from './airport-selection.component';

describe('AirportSelectionComponent', () => {
  let component: AirportSelectionComponent;
  let fixture: ComponentFixture<AirportSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirportSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirportSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
