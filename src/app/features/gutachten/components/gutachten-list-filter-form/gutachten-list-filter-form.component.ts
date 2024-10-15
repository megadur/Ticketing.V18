import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Gutachten } from '../../../gutachten/data/types/gutachten';
import { GutachtenFilter } from '../../data/types/gutachten-filter';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Gutachter } from '../../../gutachter/data/types/gutachter';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gutachten-list-filter-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './gutachten-list-filter-form.component.html',
  styleUrl: './gutachten-list-filter-form.component.css'
})
export class GutachtenListFilterFormComponent implements OnInit, OnDestroy {
  @Input()
  currentFilter: GutachtenFilter|null = null;
  @Input()
  gutachters: Gutachter[] |null= [];
  @Output() filter = new EventEmitter<GutachtenFilter>();

  form!: FormGroup;
  formValue!: GutachtenFilter;
  formValueSub!: Subscription;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
    this.formValueSub = this.form.valueChanges.subscribe(value => {
      const updatedFilter: GutachtenFilter = {
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
