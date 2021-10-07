import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SecondDependencyService } from '../second-dependency.service';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

export interface User {
  firstName: string;
  secondName: string | undefined;
}

@Component({
  selector: 'app-testing-component',
  templateUrl: './testing-component.component.html',
  styleUrls: ['./testing-component.component.css']
})
export class TestingComponentComponent {
  @Input() user!: User;
  @Output() buttonClicked: EventEmitter<string> = new EventEmitter<string>();
  items!: string[];

  constructor(private secondDependencyService: SecondDependencyService) {
  }

  get userFirstName(): string {
    return this.user?.firstName;
  }

  get userSecondName(): string {
    return <string>this.user?.secondName;
  }

  sum(a: number, b: number): number {
    return a + b;
  }

  clickOnButton(): void {
    this.buttonClicked.emit(this.user?.firstName);
  }

  getList(): Observable<string[]> {
    return this.secondDependencyService.observableExample()
      .pipe(
        catchError(() => throwError("Service unavailable")),
        tap(v => this.items = v.map(i => `${i} item`)),
      )
  }
}
