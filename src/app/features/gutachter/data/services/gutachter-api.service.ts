import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Gutachter } from '../types/gutachter';

@Injectable({
  providedIn: 'root'
})
export class GutachterApiService implements InMemoryDbService {

  createDb(): { gutachtens: Gutachter[] } {
    const gutachtens: Gutachter[] = [
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
    return { gutachtens };
  }
}

