import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { TicketWithUser } from '../../data/types/ticket-with-user';
import { User } from '../../../user/data/types/user';
import { TicketService } from '../../data/services';
import { Ticket } from '../../data/types/ticket';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../user/data/services/user.service';
import { TicketUtilsService } from '../../../../shared/services/ticket-utils.service';

@Component({
  selector: 'app-ticket-detail',
  standalone: true,
  imports: [    
    CommonModule,
    RouterLink,
  ],
  templateUrl: './ticket-detail.component.html',
  styleUrl: './ticket-detail.component.css'
})
export class TicketDetailComponent implements OnInit {
  ticketWithUser$: Observable<TicketWithUser>= new Observable<TicketWithUser>();
  pageTitle = 'Ticket Detail';
  errorMessage = '';
  ticket: Ticket  | undefined;

  constructor(
    //private store: Store<RootStoreState.RootState>,
    private route: ActivatedRoute,
    private router: Router,
    private ticketService: TicketService,
    private userService: UserService,
    private ticketUtilsService: TicketUtilsService,
    
 ) {}

  ngOnInit() {
    // this.ticketWithUser$ = this.store.select(
    //   RootStoreSelectors.selectCurrentTicketWithUser
    // );
    let ticketsWithUser$ =this.ticketUtilsService.ticketsWithUser$(this.ticketService.tickets(), this.userService.users());
    const ticketId = +this.route.snapshot.paramMap.get('id')!;
    console.log('ngOnInit:',{ ticketId: ticketId});
    if (ticketId) {
      const id = +ticketId;
      ticketsWithUser$.subscribe(tickets => {
        this.ticketWithUser$ = new Observable<TicketWithUser>(observer => {
          const ticket = tickets.find(ticket => ticket.id === id);
          observer.next(ticket);
          observer.complete();
        });
      });
      //this.getTicket(id);
    }

    // this.store.dispatch(
    //   new TicketStoreActions.SelectTicketAction({ ticketId })
    // );
  }
  getTicket(id: number): void {
    this.ticketService.ticket(id).subscribe({
      next: (ticket: Ticket | undefined) => this.ticket = ticket,
      error: (err: string) => this.errorMessage = err
    });
  }
  onBack(): void {
    this.router.navigate(['/tickets']);
  }

}