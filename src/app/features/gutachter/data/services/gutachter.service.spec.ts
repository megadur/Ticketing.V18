import { TestBed } from '@angular/core/testing';
import { GutachterService } from './gutachter.service';



describe('GutachterService', () => {
  let service: GutachterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GutachterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
