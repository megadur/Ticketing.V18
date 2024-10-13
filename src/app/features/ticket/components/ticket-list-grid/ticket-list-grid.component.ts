import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TicketWithUser } from '../../data/types/ticket-with-user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ticket-list-grid',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './ticket-list-grid.component.html',
  styleUrl: './ticket-list-grid.component.css'
})
export class TicketListGridComponent implements OnInit {
  @Input() ticketsWithUsers: TicketWithUser[]|null = [];
  @Input() isLoading: boolean|null = false;

  @Output() view = new EventEmitter<number>();
  @Output() assign = new EventEmitter<number>();
  @Output() complete = new EventEmitter<{ticketId: number, originalStatus: boolean}>();

  constructor() {}

  ngOnInit() {}
}
