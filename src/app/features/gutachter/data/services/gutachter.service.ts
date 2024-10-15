import { Injectable } from '@angular/core';
import { Observable, of, delay, tap, throwError } from 'rxjs';
import { Gutachter } from '../types/gutachter';

function randomDelay() {
  return Math.random() * 400;
}

@Injectable({
  providedIn: 'root'
})
export class GutachterService {

  storedGutachters: Gutachter[] = [
    { 
      id: 111, 
      name: 'Victor',
      starRating: 3.2,
      imageUrl: 'assets/images/man1.png',
      tags: ['rake', 'leaf', 'yard', 'home']   ,
      address: '1234 Anywhere St.', 
  }, 
  { id: 112, name: 'Wes',
      starRating: 2.2,
      imageUrl: 'assets/images/man1.png',
      tags: [ 'yard', 'home']   ,
      address: '1234 Anywhere St.', 

   }
  ];

  lastId = 1;

  constructor() { }

  public findGutachterById = (id: number) => this.storedGutachters.find(gutachter => gutachter.id === +id);

  gutachters(): Observable<Gutachter[]> {
    return of(this.storedGutachters).pipe(delay(randomDelay()));
  }

  gutachter(id: number): Observable<Gutachter | undefined> {
    return of(this.findGutachterById(id)).pipe(delay(randomDelay()));
  }

  getGutachters(): Observable<Gutachter[]> {
    return of(this.storedGutachters).pipe(delay(randomDelay()));
  }

  getGutachter(id: number): Observable<Gutachter| undefined> {
    return of(this.findGutachterById(id)).pipe(delay(randomDelay()));
  }

  createGutachter(gutachter: Gutachter): Observable<Gutachter> {
    this.storedGutachters.push(gutachter);
    return of(gutachter);
  }

  deleteGutachter(id: number): Observable<{}> {
    delete this.storedGutachters[id];
    return of({});
  }

  updateGutachter(gutachter: Gutachter): Observable<Gutachter> {
    let indexToUpdate = this.storedGutachters.findIndex(item => item.id === gutachter.id);
    this.storedGutachters[indexToUpdate] = gutachter;
    return of(gutachter);  
  }

  private handleError(err: { error: { message: any; }; status: any; body: { error: any; }; }): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(() => errorMessage);

  }

  private initializeGutachter(): Gutachter {
    // Return an initialized object
    return {
      id: 0,
      name: undefined,
      tags: [''],
      description: undefined,
      starRating: 0,
      imageUrl: undefined
    };
  }

}
