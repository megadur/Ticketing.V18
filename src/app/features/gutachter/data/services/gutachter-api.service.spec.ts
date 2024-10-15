import { TestBed } from '@angular/core/testing';
import { GutachterApiService } from './gutachter-api.service';



describe('GutachterApiService', () => {
  let service: GutachterApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GutachterApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
