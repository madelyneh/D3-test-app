import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonalTableComponent } from './seasonal-table.component';

describe('SeasonalTableComponent', () => {
  let component: SeasonalTableComponent;
  let fixture: ComponentFixture<SeasonalTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeasonalTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeasonalTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
