import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Ticket } from '../../data/types/ticket';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-ticket-modal',
  standalone: true,
  imports: [
    FormsModule,

  ],
  templateUrl: './create-ticket-modal.component.html',
  styleUrl: './create-ticket-modal.component.css'
})
export class CreateTicketModalComponent implements OnInit {
  newTicketDescription: string='';

  constructor(
    //private store: Store<RootStoreState.RootState>,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit() {}

  create() {
    const newTicket: Ticket = {
      assigneeId: undefined,
      completed: false,
      description: this.newTicketDescription,
      id: 0
    };

    // this.store.dispatch(
    //   new TicketStoreActions.AddTicketAction({
    //     newTicket
    //   })
    // );
    this.activeModal.close();
  }

  cancel() {
    this.activeModal.close();
  }
}
