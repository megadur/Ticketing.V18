import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, map, mergeMap, tap } from 'rxjs/operators';
import { Gutachten } from '../types/gutachten';
import { GutachterService } from '../../../gutachter/data/services/gutachter.service';
import { Gutachter } from '../../../gutachter/data/types/gutachter';
import { GutachtenWithGutachter } from '../types/gutachten-with-gutachter';


function randomDelay() {
  return Math.random() * 400;
}

@Injectable({ providedIn: 'root' })
export class GutachtenService {
  storedGutachtens: Gutachten[] = [
    {
      id: 0,
      description: 'Install a monitor arm',
      assigneeId: 111,
      completed: false
    },
    {
      id: 1,
      description: 'Move the desk to the new location',
      assigneeId: 112,
      completed: false
    },
    {
      id: 2,
      description: 'Gutachten 2',
      assigneeId: 113,
      completed: false
    },
    {
      id: 3,
      description: 'Gutachten 3',
      assigneeId: undefined,
      completed: true
    }
  ];


  lastId = 1;

  constructor(private gutachterService: GutachterService) {}

  private findGutachtenById = (id: number) =>
    this.storedGutachtens.find(gutachten => gutachten.id === +id);

  gutachtens(): Observable<Gutachten[]> {
    return of(this.storedGutachtens).pipe(delay(randomDelay()));
  }

  gutachten(id: number): Observable<Gutachten |undefined> {
    return of(this.findGutachtenById(id)).pipe(delay(randomDelay()));
  }

  newGutachten(payload: { description: string }): Observable<Gutachten> {
    const newGutachten: Gutachten = {
      id: ++this.lastId,
      description: payload.description,
      assigneeId: undefined,
      completed: false
    };

    return of(newGutachten).pipe(
      delay(randomDelay()),
      tap((gutachten: Gutachten) => this.storedGutachtens.push(gutachten))
    );
  }

  assign(gutachtenId: number, gutachterId: number): Observable<Gutachten> {
    const foundGutachten = this.findGutachtenById(+gutachtenId);
    const gutachter = this.gutachterService.findGutachterById(+gutachterId);

    if (foundGutachten && gutachter) {
      return of(foundGutachten).pipe(
        delay(randomDelay()),
        tap((gutachten: Gutachten) => {
          gutachten.assigneeId = +gutachterId;
        })
      );
    }
    return throwError(() => new Error('gutachten or gutachter not found'))
  }

  complete(gutachtenId: number, completed: boolean): Observable<Gutachten> {
    const foundGutachten = this.findGutachtenById(+gutachtenId);
    if (foundGutachten) {
      return of(foundGutachten).pipe(
        //delay(randomDelay()),
        tap((gutachten: Gutachten) => {
          //throw new Error('Backend failure');
          gutachten.completed = true;
        })
      );
    }

    return throwError(() => new Error('gutachten not found'))
  }
 
}
