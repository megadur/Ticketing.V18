import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Gutachten } from './types/gutachten';


export class GutachtenData implements InMemoryDbService {

  createDb(): { gutachtens: Gutachten[]} {
    const gutachtens: Gutachten[] = [
      {
        id: 0,
        description: 'Install a monitor arm',
        assigneeId: 111,
        completed: false
      },
      {
        id: 1,
        description: 'Move the desk to the new location',
        assigneeId: 111,
        completed: false
      }
    ];
    return { gutachtens };
  }
}
