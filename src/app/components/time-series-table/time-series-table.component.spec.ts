import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSeriesTableComponent } from './time-series-table.component';

describe('TimeSeriesTableComponent', () => {
  let component: TimeSeriesTableComponent;
  let fixture: ComponentFixture<TimeSeriesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeSeriesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeSeriesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
