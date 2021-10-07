import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirstDependencyService {
  ageValue: number;

  constructor() {
    this.ageValue = 5;
  }

  get age(): number {
    return this.ageValue;
  }

  returnValue(index: number): string {
    const values = ["one", "two", "three"];
    return values[index];
  }

  initValue2(text: string): void {
    alert("something" + text);
  }

}
