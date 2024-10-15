import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, mergeMap, Observable, of } from 'rxjs';
import { Gutachten } from '../../../gutachten/data/types/gutachten';
import { GutachtenFilter } from '../../data/types/gutachten-filter';
import { GutachtenWithGutachter } from '../../data/types/gutachten-with-gutachter';
import { CommonModule } from '@angular/common';
import { GutachtenListFilterFormComponent } from '../gutachten-list-filter-form/gutachten-list-filter-form.component';
import { GutachtenListGridComponent } from '../gutachten-list-grid/gutachten-list-grid.component';
import { GutachtenService } from '../../data/services';
import { GutachterService } from '../../../gutachter/data/services/gutachter.service';
import { Gutachter } from '../../../gutachter/data/types/gutachter';
import { GutachtenUtilsService } from '../../../../shared/services/gutachten-utils.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AssignGutachterModalComponent } from '../assign-gutachter-modal/assign-gutachter-modal.component';
import { CreateGutachtenModalComponent } from '../create-gutachten-modal/create-gutachten-modal.component';

@Component({
  selector: 'app-gutachten-list',
  standalone: true,
  imports: [
    CommonModule,
    GutachtenListFilterFormComponent,
    GutachtenListGridComponent,
  ],
  templateUrl: './gutachten-list.component.html',
  styleUrl: './gutachten-list.component.css'
})
export class GutachtenListComponent implements OnInit {
  gutachtensWithGutachters$: Observable<GutachtenWithGutachter[]>= new Observable<GutachtenWithGutachter[]>();
  gutachtens$: Observable<Gutachten[]>= new Observable<Gutachten[]>();
  gutachters$: Observable<Gutachter[]>= new Observable<Gutachter[]>();
  currentFilter$: Observable<GutachtenFilter>= new Observable<GutachtenFilter>();
  isLoading$: Observable<boolean>= new Observable<boolean>();

  gutachtenService=inject(GutachtenService)
  gutachterService=inject(GutachterService)
  gutachtenUtilsService=inject(GutachtenUtilsService)

  constructor(
    //private store: Store<RootStoreState.RootState>,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.gutachtens$=this.gutachtenService.gutachtens();
    this.gutachters$=this.gutachterService.gutachters();
   
    this.gutachtensWithGutachters$=this.gutachtenUtilsService.gutachtensWithGutachter$(this.gutachtens$, this.gutachters$);
    
    // this.gutachtensWithGutachtens$ = this.store.select(
    //   RootStoreSelectors.selectFilteredGutachtenItemsWithGutachten
    // );
    // this.currentFilter$ = this.store.select(
    //   GutachtenStoreSelectors.selectGutachtenCurrentFilter
    // );
    // this.isLoading$ = this.store.select(RootStoreSelectors.selectIsLoading);
    // this.gutachter$ = this.store.select(GutachtenStoreSelectors.selectAllGutachtenItems);
  }

  createGutachten() {
    this.modalService.open(CreateGutachtenModalComponent);
  }

  onViewGutachten(gutachtenId: number) {
    console.log('onViewGutachten',{ gutachtenId: gutachtenId});
    this.router.navigate(['/gutachtens', gutachtenId]);
  }

  onAssignGutachten(gutachtenId: number) {
    const modalRef = this.modalService.open(AssignGutachterModalComponent);
    modalRef.componentInstance.gutachtenId = gutachtenId;
  }

  onCompleteGutachten(event: {gutachtenId: number, originalStatus: boolean}) {
    console.log('onComplete',{ gutachtenId: event.gutachtenId, originalStatus: event.originalStatus });
    let gutachten$=this.gutachtenService.complete(event.gutachtenId, event.originalStatus)
    let agutachten: Gutachten;
    gutachten$.subscribe((gutachten: Gutachten) => {
      agutachten= gutachten;
      console.log('gutachten', gutachten);

    });
    // this.store.dispatch(
    //   new GutachtenStoreActions.CompleteGutachtenAction({ gutachtenId: event.gutachtenId, originalStatus: event.originalStatus })
    // );
  }

  onFilterGutachtens(filter: GutachtenFilter) {
    // this.store.dispatch(new GutachtenStoreActions.FilterGutachtensAction({ filter }));
    this.gutachtensWithGutachters$=this.gutachtenUtilsService.filterGutachtens$(of(filter), this.gutachtens$);
  }
}
