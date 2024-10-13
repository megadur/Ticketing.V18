import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class UserApiService implements InMemoryDbService {

  createDb(): { tickets: User[] } {
    const tickets: User[] = [
      { 
        id: 111, 
        name: 'Victor',
        starRating: 3.2,
        imageUrl: 'assets/images/man2.png',
        tags: ['rake', 'leaf', 'yard', 'home']   ,
        address: '1234 Anywhere St.', 
    }, 
    { id: 112, name: 'Wes',
        starRating: 2.2,
        imageUrl: 'assets/images/man2.png',
        tags: [ 'yard', 'home']   ,
        address: '1234 Anywhere St.', 

     }    ];
    return { tickets };
  }
}

