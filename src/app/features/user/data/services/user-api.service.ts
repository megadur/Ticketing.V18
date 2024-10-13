import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class UserApiService implements InMemoryDbService {

  createDb(): { tickets: User[] } {
    const tickets: User[] = [
      { id: 111, name: 'Victor' }, { id: 112, name: 'Wes' }];
    return { tickets };
  }
}

