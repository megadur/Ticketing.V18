import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ticket } from '../../../ticket/data/types/ticket';
import { TicketFilter } from '../../data/types/ticket-filter';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-ticket-list-filter-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './ticket-list-filter-form.component.html',
  styleUrl: './ticket-list-filter-form.component.css'
})
export class TicketListFilterFormComponent implements OnInit, OnDestroy {
  @Input()
  currentFilter: TicketFilter|null = null;
  @Input()
  tickets: Ticket[] |null= [];
  @Output() filter = new EventEmitter<TicketFilter>();

  form!: FormGroup;
  formValue!: TicketFilter;
  formValueSub!: Subscription;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
    this.formValueSub = this.form.valueChanges.subscribe(value => {
      const updatedFilter: TicketFilter = {
        ...value,
        completed:
          value.completed !== null && value.completed !== ''
            ? value.completed === 'true'
            : null,
        assigneeId:
          value.assigneeId !== null && value.assigneeId !== ''
            ? parseInt(value.assigneeId, 10)
            : null
      };
      this.formValue = updatedFilter;
    });
    this.form.setValue({
      assigneeId: null,
      completed: null
    });
  }

  buildForm() {
    this.form = this.fb.group({
      completed: [null],
      assigneeId: [null]
    });
  }

  updateFilter() {
    this.filter.emit({ ...this.formValue });
  }

  ngOnDestroy() {
    if (this.formValueSub) {
      this.formValueSub.unsubscribe();
    }
  }
}
