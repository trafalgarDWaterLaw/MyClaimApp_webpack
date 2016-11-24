import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let claims = [
      {claimType: 'Travel', expense: 2500, date: '21/11/2016'},
      {claimType: 'Mobile', expense: 500, date: '21/11/2016'},
      {claimType: 'HRA', expense: 8000, date: '21/11/2016'}      
    ];
    return {claims};
  }
}
