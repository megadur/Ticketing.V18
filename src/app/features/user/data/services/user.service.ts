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

  storedUsers: User[] = [{ id: 111, name: 'Victor' }, { id: 112, name: 'Wes' }];

  lastId = 1;

  constructor() { }

  public findUserById = (id: number) => this.storedUsers.find(user => user.id === +id);

  users(): Observable<User[]> {
    return of(this.storedUsers).pipe(delay(randomDelay()));
  }

  user(id: number): Observable<User | undefined> {
    return of(this.findUserById(id)).pipe(delay(randomDelay()));
  }


}
