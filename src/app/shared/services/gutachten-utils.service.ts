import { Injectable } from '@angular/core';
import { Observable, of, delay, mergeMap, map } from 'rxjs';
import { Gutachten } from '../../features/gutachten/data/types/gutachten';
import { GutachtenWithGutachter } from '../../features/gutachten/data/types/gutachten-with-gutachter';
import { Gutachter } from '../../features/gutachter/data/types/gutachter';
import { GutachtenFilter } from '../../features/gutachten/data/types/gutachten-filter';

@Injectable({
  providedIn: 'root'
})
export class GutachtenUtilsService {

  constructor() { }

  gutachtensWithGutachter$(filteredGutachtens$: Observable<Gutachten[]>, gutachters$: Observable<Gutachter[]>): Observable<GutachtenWithGutachter[]> {
    return filteredGutachtens$.pipe(
      mergeMap(filteredGutachtens => 
        gutachters$.pipe(
          map(gutachters => {
            if (filteredGutachtens) {
              return filteredGutachtens.map(t => {
                const foundGutachter = gutachters.find(u => u.id === t.assigneeId);
                return {
                  assigneeId: undefined,
                  ...t,
                  assigneeName: foundGutachter ? foundGutachter.name : 'No Gutachter'
                };
              });
            }
            return [];
          })
        )
      )
    );
  }
  filterGutachtens$(currentFilter$: Observable<GutachtenFilter>, items$: Observable<Gutachten[]>): Observable<Gutachten[]> {
    return currentFilter$.pipe(
      mergeMap(currentFilter =>
        items$.pipe(
          map(items =>
            items
              .filter(
                item =>
                  currentFilter.assigneeId === null ||
                  item.assigneeId === currentFilter.assigneeId
              )
              .filter(
                item =>
                  currentFilter.completed === null ||
                  item.completed === currentFilter.completed
              )
          )
        )
      )
    );
  }
  filterGutachtens  (currentFilter: GutachtenFilter, items: Gutachten[]): Gutachten[]  {
    return items
      .filter(
        item =>
          currentFilter.assigneeId === null ||
          item.assigneeId === currentFilter.assigneeId
      )
      .filter(
        item =>
          currentFilter.completed === null ||
          item.completed === currentFilter.completed
      );
  }
}
