import { Injectable } from '@angular/core';
import { CheckValueService } from './check-value.service';

@Injectable({
  providedIn: 'root'
})
export class SimpleService {

  constructor(
    private checkValueService: CheckValueService
  ) {
  }

  sum(arg1: number | undefined, arg2?: number): number | undefined {
    if (!arg2) {
      return undefined;
    }

    if (!arg1) {
      return 22;
    }
    return arg1 + arg2;
  }

  check(): boolean {
    return this.checkValueService.check();
  }
}