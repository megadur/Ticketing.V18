import { Injectable } from '@angular/core';
import { Observable, of, delay, tap, throwError } from 'rxjs';
import { User } from '../types/user';

function randomDelay() {
  return Math.random() * 4000;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  storedUsers: User[] = [
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

  public findUserById = (id: number) => this.storedUsers.find(user => user.id === +id);

  users(): Observable<User[]> {
    return of(this.storedUsers).pipe(delay(randomDelay()));
  }

  user(id: number): Observable<User | undefined> {
    return of(this.findUserById(id)).pipe(delay(randomDelay()));
  }

  getUsers(): Observable<User[]> {
    return of(this.storedUsers).pipe(delay(randomDelay()));
  }

  getUser(id: number): Observable<User| undefined> {
    return of(this.findUserById(id)).pipe(delay(randomDelay()));
  }

  createUser(user: User): Observable<User> {
    this.storedUsers.push(user);
    return of(user);
  }

  deleteUser(id: number): Observable<{}> {
    delete this.storedUsers[id];
    return of({});
  }

  updateUser(user: User): Observable<User> {
    let indexToUpdate = this.storedUsers.findIndex(item => item.id === user.id);
    this.storedUsers[indexToUpdate] = user;
    return of(user);  
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

  private initializeUser(): User {
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
