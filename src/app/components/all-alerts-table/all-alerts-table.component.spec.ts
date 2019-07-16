import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAlertsTableComponent } from './all-alerts-table.component';

describe('AllAlertsTableComponent', () => {
  let component: AllAlertsTableComponent;
  let fixture: ComponentFixture<AllAlertsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllAlertsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllAlertsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
