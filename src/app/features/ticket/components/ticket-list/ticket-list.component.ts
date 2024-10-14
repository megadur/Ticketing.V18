import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, mergeMap, Observable, of } from 'rxjs';
import { Ticket } from '../../../ticket/data/types/ticket';
import { TicketFilter } from '../../data/types/ticket-filter';
import { TicketWithUser } from '../../data/types/ticket-with-user';
import { CommonModule } from '@angular/common';
import { TicketListFilterFormComponent } from '../ticket-list-filter-form/ticket-list-filter-form.component';
import { TicketListGridComponent } from '../ticket-list-grid/ticket-list-grid.component';
import { TicketService } from '../../data/services';
import { UserService } from '../../../user/data/services/user.service';
import { User } from '../../../user/data/types/user';
import { TicketUtilsService } from '../../../../shared/services/ticket-utils.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AssignUserModalComponent } from '../assign-user-modal/assign-user-modal.component';
import { CreateTicketModalComponent } from '../create-ticket-modal/create-ticket-modal.component';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [
    CommonModule,
    TicketListFilterFormComponent,
    TicketListGridComponent,
  ],
  templateUrl: './ticket-list.component.html',
  styleUrl: './ticket-list.component.css'
})
export class TicketListComponent implements OnInit {
  ticketsWithUsers$: Observable<TicketWithUser[]>= new Observable<TicketWithUser[]>();
  tickets$: Observable<Ticket[]>= new Observable<Ticket[]>();
  users$: Observable<User[]>= new Observable<User[]>();
  currentFilter$: Observable<TicketFilter>= new Observable<TicketFilter>();
  isLoading$: Observable<boolean>= new Observable<boolean>();

  ticketService=inject(TicketService)
  userService=inject(UserService)
  ticketUtilsService=inject(TicketUtilsService)

  constructor(
    //private store: Store<RootStoreState.RootState>,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.tickets$=this.ticketService.tickets();
    this.users$=this.userService.users();
   
    this.ticketsWithUsers$=this.ticketUtilsService.ticketsWithUser$(this.tickets$, this.users$);
    
    // this.ticketsWithTickets$ = this.store.select(
    //   RootStoreSelectors.selectFilteredTicketItemsWithTicket
    // );
    // this.currentFilter$ = this.store.select(
    //   TicketStoreSelectors.selectTicketCurrentFilter
    // );
    // this.isLoading$ = this.store.select(RootStoreSelectors.selectIsLoading);
    // this.user$ = this.store.select(TicketStoreSelectors.selectAllTicketItems);
  }

  createTicket() {
    this.modalService.open(CreateTicketModalComponent);
  }

  onViewTicket(ticketId: number) {
    console.log('onViewTicket',{ ticketId: ticketId});
    this.router.navigate(['/tickets', ticketId]);
  }

  onAssignTicket(ticketId: number) {
    const modalRef = this.modalService.open(AssignUserModalComponent);
    modalRef.componentInstance.ticketId = ticketId;
  }

  onCompleteTicket(event: {ticketId: number, originalStatus: boolean}) {
    console.log('onComplete',{ ticketId: event.ticketId, originalStatus: event.originalStatus });
    let ticket$=this.ticketService.complete(event.ticketId, event.originalStatus)
    let aticket: Ticket;
    ticket$.subscribe((ticket: Ticket) => {
      aticket= ticket;
      console.log('ticket', ticket);

    });
    // this.store.dispatch(
    //   new TicketStoreActions.CompleteTicketAction({ ticketId: event.ticketId, originalStatus: event.originalStatus })
    // );
  }

  onFilterTickets(filter: TicketFilter) {
    // this.store.dispatch(new TicketStoreActions.FilterTicketsAction({ filter }));
    this.ticketsWithUsers$=this.ticketUtilsService.filterTickets$(of(filter), this.tickets$);
  }
}
