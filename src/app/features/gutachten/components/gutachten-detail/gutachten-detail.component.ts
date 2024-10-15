import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { GutachtenWithGutachter } from '../../data/types/gutachten-with-gutachter';
import { Gutachter } from '../../../gutachter/data/types/gutachter';
import { GutachtenService } from '../../data/services';
import { Gutachten } from '../../data/types/gutachten';
import { CommonModule } from '@angular/common';
import { GutachterService } from '../../../gutachter/data/services/gutachter.service';
import { GutachtenUtilsService } from '../../../../shared/services/gutachten-utils.service';

@Component({
  selector: 'app-gutachten-detail',
  standalone: true,
  imports: [    
    CommonModule,
    RouterLink,
  ],
  templateUrl: './gutachten-detail.component.html',
  styleUrl: './gutachten-detail.component.css'
})
export class GutachtenDetailComponent implements OnInit {
  gutachtenWithGutachter$: Observable<GutachtenWithGutachter>= new Observable<GutachtenWithGutachter>();
  pageTitle = 'Gutachten Detail';
  errorMessage = '';
  gutachten: Gutachten  | undefined;

  constructor(
    //private store: Store<RootStoreState.RootState>,
    private route: ActivatedRoute,
    private router: Router,
    private gutachtenService: GutachtenService,
    private gutachterService: GutachterService,
    private gutachtenUtilsService: GutachtenUtilsService,
    
 ) {}

  ngOnInit() {
    // this.gutachtenWithGutachter$ = this.store.select(
    //   RootStoreSelectors.selectCurrentGutachtenWithGutachter
    // );
    let gutachtensWithGutachter$ =this.gutachtenUtilsService.gutachtensWithGutachter$(this.gutachtenService.gutachtens(), this.gutachterService.gutachters());
    const gutachtenId = +this.route.snapshot.paramMap.get('id')!;
    console.log('ngOnInit:',{ gutachtenId: gutachtenId});
    if (gutachtenId) {
      const id = +gutachtenId;
      gutachtensWithGutachter$.subscribe(gutachtens => {
        this.gutachtenWithGutachter$ = new Observable<GutachtenWithGutachter>(observer => {
          const gutachten = gutachtens.find(gutachten => gutachten.id === id);
          observer.next(gutachten);
          observer.complete();
        });
      });
      //this.getGutachten(id);
    }

    // this.store.dispatch(
    //   new GutachtenStoreActions.SelectGutachtenAction({ gutachtenId })
    // );
  }
  getGutachten(id: number): void {
    this.gutachtenService.gutachten(id).subscribe({
      next: (gutachten: Gutachten | undefined) => this.gutachten = gutachten,
      error: (err: string) => this.errorMessage = err
    });
  }
  onBack(): void {
    this.router.navigate(['/gutachtens']);
  }

}