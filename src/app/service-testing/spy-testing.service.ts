import { Injectable } from '@angular/core';
import { FirstDependencyService } from './first-dependency.service';

@Injectable({
  providedIn: 'root'
})
export class SpyTestingService {

  constructor(private firstDependencyService: FirstDependencyService) {
  }

  getValue(index: number): string {
    return this.firstDependencyService.returnValue(index);
  }

  getIndex(): number {
    return 2;
  }

  sayHi(message: string): void {
    this.firstDependencyService.initValue2(message);
  }

  returnAge(): number {
    return this.firstDependencyService.age;
  }

}
