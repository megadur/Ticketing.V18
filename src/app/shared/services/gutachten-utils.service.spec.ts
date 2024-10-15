import { TestBed } from '@angular/core/testing';

import { GutachtenUtilsService } from './gutachten-utils.service';

describe('GutachtenUtilsService', () => {
  let service: GutachtenUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GutachtenUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
