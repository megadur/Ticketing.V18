import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Gutachten } from '../../data/types/gutachten';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-gutachten-modal',
  standalone: true,
  imports: [
    FormsModule,

  ],
  templateUrl: './create-gutachten-modal.component.html',
  styleUrl: './create-gutachten-modal.component.css'
})
export class CreateGutachtenModalComponent implements OnInit {
  newGutachtenDescription: string='';

  constructor(
    //private store: Store<RootStoreState.RootState>,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit() {}

  create() {
    const newGutachten: Gutachten = {
      assigneeId: undefined,
      completed: false,
      description: this.newGutachtenDescription,
      id: 0
    };

    // this.store.dispatch(
    //   new GutachtenStoreActions.AddGutachtenAction({
    //     newGutachten
    //   })
    // );
    this.activeModal.close();
  }

  cancel() {
    this.activeModal.close();
  }
}
