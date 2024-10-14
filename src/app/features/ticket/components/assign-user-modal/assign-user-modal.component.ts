import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { User } from '../../../user/data/types/user';
import { TicketService } from '../../data/services';
import { UserService } from '../../../user/data/services/user.service';
import { TicketUtilsService } from '../../../../shared/services/ticket-utils.service';

@Component({
  selector: 'app-assign-user-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

  ],
  templateUrl: './assign-user-modal.component.html',
  styleUrl: './assign-user-modal.component.css'
})
export class AssignUserModalComponent implements OnInit {
  users$: Observable<User[]>= new Observable<User[]>();
  ticketId: number=0;

  selectedAssignee: number=0;
  ticketService=inject(TicketService)

  userService=inject(UserService)
  ticketUtilsService=inject(TicketUtilsService)

  constructor(
//    private store: Store<RootStoreState.RootState>,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
//    this.users$ = this.store.select(UserStoreSelectors.selectAllUserItems);
//this.tickets$=this.ticketService.tickets();
this.users$=this.userService.users();

//this.ticketsWithUsers$=this.ticketUtilsService.ticketsWithUser(this.tickets$, this.users$);
}

  assign() {
    this.ticketService.assign(this.ticketId, this.selectedAssignee)
    // this.store.dispatch(
    //   new TicketStoreActions.AssignTicketAction({
    //     ticketId: this.ticketId,
    //     userId: this.selectedAssignee
    //   })
    // );
    this.activeModal.close();
  }

  cancel() {
    this.activeModal.close();
  }
}