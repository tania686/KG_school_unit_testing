import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecondDependencyService {

  constructor() { }

  observableExample(): Observable<string[]> {
    return new Observable<string[]>(subscriber => {
      setTimeout(() => {
        subscriber.next(['first', 'second', 'third']);
        subscriber.complete();
      }, 1000);
    });
  }
}
