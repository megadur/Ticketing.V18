import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Ticket } from '../../../ticket/data/types/ticket';
import { TicketFilter } from '../../data/types/ticket-filter';
import { TicketWithUser } from '../../data/types/ticket-with-user';
import { CommonModule } from '@angular/common';
import { TicketListFilterFormComponent } from '../ticket-list-filter-form/ticket-list-filter-form.component';
import { TicketListGridComponent } from '../ticket-list-grid/ticket-list-grid.component';
import { TicketService } from '../../data/services';

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
  currentFilter$: Observable<TicketFilter>= new Observable<TicketFilter>();
  isLoading$: Observable<boolean>= new Observable<boolean>();
  ticketService=inject(TicketService)
  constructor(
    //private store: Store<RootStoreState.RootState>,
    private router: Router,
    //private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.tickets$=this.ticketService.tickets();
    // this.ticketsWithTickets$ = this.store.select(
    //   RootStoreSelectors.selectFilteredTicketItemsWithTicket
    // );
    // this.currentFilter$ = this.store.select(
    //   TicketStoreSelectors.selectTicketCurrentFilter
    // );
    // this.isLoading$ = this.store.select(RootStoreSelectors.selectIsLoading);
    // this.tickets$ = this.store.select(TicketStoreSelectors.selectAllTicketItems);
  }

  createTicket() {
    // this.modalService.open(CreateTicketModalComponent);
  }

  onViewTicket(ticketId: number) {
    this.router.navigate(['/tickets', ticketId]);
  }

  onAssignTicket(ticketId: number) {
    // const modalRef = this.modalService.open(AssignTicketModalComponent);
    // modalRef.componentInstance.ticketId = ticketId;
  }

  onCompleteTicket(event: {ticketId: number, originalStatus: boolean}) {
    console.log('onComplete',{ ticketId: event.ticketId, originalStatus: event.originalStatus });
    // this.store.dispatch(
    //   new TicketStoreActions.CompleteTicketAction({ ticketId: event.ticketId, originalStatus: event.originalStatus })
    // );
  }

  onFilterTickets(filter: TicketFilter) {
    // this.store.dispatch(new TicketStoreActions.FilterTicketsAction({ filter }));
  }
}
