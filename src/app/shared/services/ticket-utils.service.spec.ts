import { TestBed } from '@angular/core/testing';

import { TicketUtilsService } from './ticket-utils.service';

describe('TicketUtilsService', () => {
  let service: TicketUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
