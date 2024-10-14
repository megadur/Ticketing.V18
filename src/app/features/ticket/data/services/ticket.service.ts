import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, map, mergeMap, tap } from 'rxjs/operators';
import { Ticket } from '../types/ticket';
import { UserService } from '../../../user/data/services/user.service';
import { User } from '../../../user/data/types/user';
import { TicketWithUser } from '../types/ticket-with-user';


function randomDelay() {
  return Math.random() * 400;
}

@Injectable({ providedIn: 'root' })
export class TicketService {
  storedTickets: Ticket[] = [
    {
      id: 0,
      description: 'Install a monitor arm',
      assigneeId: 111,
      completed: false
    },
    {
      id: 1,
      description: 'Move the desk to the new location',
      assigneeId: 112,
      completed: false
    },
    {
      id: 2,
      description: 'Ticket 2',
      assigneeId: 113,
      completed: false
    },
    {
      id: 3,
      description: 'Ticket 3',
      assigneeId: undefined,
      completed: true
    }
  ];


  lastId = 1;

  constructor(private userService: UserService) {}

  private findTicketById = (id: number) =>
    this.storedTickets.find(ticket => ticket.id === +id);

  tickets(): Observable<Ticket[]> {
    return of(this.storedTickets).pipe(delay(randomDelay()));
  }

  ticket(id: number): Observable<Ticket |undefined> {
    return of(this.findTicketById(id)).pipe(delay(randomDelay()));
  }

  newTicket(payload: { description: string }): Observable<Ticket> {
    const newTicket: Ticket = {
      id: ++this.lastId,
      description: payload.description,
      assigneeId: undefined,
      completed: false
    };

    return of(newTicket).pipe(
      delay(randomDelay()),
      tap((ticket: Ticket) => this.storedTickets.push(ticket))
    );
  }

  assign(ticketId: number, userId: number): Observable<Ticket> {
    const foundTicket = this.findTicketById(+ticketId);
    const user = this.userService.findUserById(+userId);

    if (foundTicket && user) {
      return of(foundTicket).pipe(
        delay(randomDelay()),
        tap((ticket: Ticket) => {
          ticket.assigneeId = +userId;
        })
      );
    }
    return throwError(() => new Error('ticket or user not found'))
  }

  complete(ticketId: number, completed: boolean): Observable<Ticket> {
    const foundTicket = this.findTicketById(+ticketId);
    if (foundTicket) {
      return of(foundTicket).pipe(
        //delay(randomDelay()),
        tap((ticket: Ticket) => {
          //throw new Error('Backend failure');
          ticket.completed = true;
        })
      );
    }

    return throwError(() => new Error('ticket not found'))
  }
 
}
