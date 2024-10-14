import { Injectable } from '@angular/core';
import { Observable, of, delay, mergeMap, map } from 'rxjs';
import { Ticket } from '../../features/ticket/data/types/ticket';
import { TicketWithUser } from '../../features/ticket/data/types/ticket-with-user';
import { User } from '../../features/user/data/types/user';
import { TicketFilter } from '../../features/ticket/data/types/ticket-filter';

@Injectable({
  providedIn: 'root'
})
export class TicketUtilsService {

  constructor() { }

  ticketsWithUser$(filteredTickets$: Observable<Ticket[]>, users$: Observable<User[]>): Observable<TicketWithUser[]> {
    return filteredTickets$.pipe(
      mergeMap(filteredTickets => 
        users$.pipe(
          map(users => {
            if (filteredTickets) {
              return filteredTickets.map(t => {
                const foundUser = users.find(u => u.id === t.assigneeId);
                return {
                  assigneeId: undefined,
                  ...t,
                  assigneeName: foundUser ? foundUser.name : 'No User'
                };
              });
            }
            return [];
          })
        )
      )
    );
  }
  filterTickets$(currentFilter$: Observable<TicketFilter>, items$: Observable<Ticket[]>): Observable<Ticket[]> {
    return currentFilter$.pipe(
      mergeMap(currentFilter =>
        items$.pipe(
          map(items =>
            items
              .filter(
                item =>
                  currentFilter.assigneeId === null ||
                  item.assigneeId === currentFilter.assigneeId
              )
              .filter(
                item =>
                  currentFilter.completed === null ||
                  item.completed === currentFilter.completed
              )
          )
        )
      )
    );
  }
  filterTickets  (currentFilter: TicketFilter, items: Ticket[]): Ticket[]  {
    return items
      .filter(
        item =>
          currentFilter.assigneeId === null ||
          item.assigneeId === currentFilter.assigneeId
      )
      .filter(
        item =>
          currentFilter.completed === null ||
          item.completed === currentFilter.completed
      );
  }
}
