import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Gutachter } from '../../../gutachter/data/types/gutachter';
import { GutachtenService } from '../../data/services';
import { GutachterService } from '../../../gutachter/data/services/gutachter.service';
import { GutachtenUtilsService } from '../../../../shared/services/gutachten-utils.service';

@Component({
  selector: 'app-assign-gutachter-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

  ],
  templateUrl: './assign-gutachter-modal.component.html',
  styleUrl: './assign-gutachter-modal.component.css'
})
export class AssignGutachterModalComponent implements OnInit {
  gutachters$: Observable<Gutachter[]>= new Observable<Gutachter[]>();
  gutachtenId: number=0;

  selectedAssignee: number=0;
  gutachtenService=inject(GutachtenService)

  gutachterService=inject(GutachterService)
  gutachtenUtilsService=inject(GutachtenUtilsService)

  constructor(
//    private store: Store<RootStoreState.RootState>,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
//    this.gutachters$ = this.store.select(GutachterStoreSelectors.selectAllGutachterItems);
//this.gutachtens$=this.gutachtenService.gutachtens();
this.gutachters$=this.gutachterService.gutachters();

//this.gutachtensWithGutachters$=this.gutachtenUtilsService.gutachtensWithGutachter(this.gutachtens$, this.gutachters$);
}

  assign() {
    this.gutachtenService.assign(this.gutachtenId, this.selectedAssignee)
    // this.store.dispatch(
    //   new GutachtenStoreActions.AssignGutachtenAction({
    //     gutachtenId: this.gutachtenId,
    //     gutachterId: this.selectedAssignee
    //   })
    // );
    this.activeModal.close();
  }

  cancel() {
    this.activeModal.close();
  }
}