import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Ticket } from '../types/ticket';

@Injectable()
export class TicketApiService implements InMemoryDbService {

  createDb(): { tickets: Ticket[]} {
    const tickets: Ticket[] = [
      {
        id: 0,
        description: 'Install a monitor arm',
        assigneeId: 111,
        completed: false
      },
      {
        id: 1,
        description: 'Move the desk to the new location',
        assigneeId: 111,
        completed: false
      }
    ];
    return { tickets };
  }
}
