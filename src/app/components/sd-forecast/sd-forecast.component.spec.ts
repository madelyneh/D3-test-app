import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SDForecastComponent } from './sd-forecast.component';

describe('SDForecastComponent', () => {
  let component: SDForecastComponent;
  let fixture: ComponentFixture<SDForecastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SDForecastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SDForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
