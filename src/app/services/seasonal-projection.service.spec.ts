import { TestBed } from '@angular/core/testing';

import { SeasonalProjectionService } from './seasonal-projection.service';

describe('SeasonalProjectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SeasonalProjectionService = TestBed.get(SeasonalProjectionService);
    expect(service).toBeTruthy();
  });
});
