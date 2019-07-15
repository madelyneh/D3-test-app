import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonalProjectionComponent } from './seasonal-projection.component';

describe('SeasonalProjectionComponent', () => {
  let component: SeasonalProjectionComponent;
  let fixture: ComponentFixture<SeasonalProjectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeasonalProjectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeasonalProjectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
