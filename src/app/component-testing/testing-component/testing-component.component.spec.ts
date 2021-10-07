import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingComponentComponent } from './testing-component.component';
import { SecondDependencyService } from '../second-dependency.service';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('TestingComponentComponent', () => {
  let component: TestingComponentComponent;
  let fixture: ComponentFixture<TestingComponentComponent>;

  const fakeSecondDependencyService = jasmine.createSpyObj('fakeSecondDependencyService', ['observableExample']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestingComponentComponent],
      providers: [{ provide: SecondDependencyService, useValue: fakeSecondDependencyService }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestingComponentComponent);
    component = fixture.componentInstance;

    component.user = {
      firstName: "John",
      secondName: "Weak"
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  //
  it("getters userFirstName and userSecondName should return components input value", () => {
    component.user = {
      firstName: "John",
      secondName: "Doe"
    };
    expect(component.userFirstName).toBe("John");
    expect(component.userSecondName).toBe("Doe");
  });
  //
  it("method sum should return sum", () => {
    const result = component.sum(1, 2);
    expect(result).toBe(3);
  });
  //
  it("component should emit user firstName on button click", () => {
    const event = spyOn(component.buttonClicked, "emit");
    component.user = {
      firstName: "Anna",
      secondName: "Smith"
    };

    component.clickOnButton();
    expect(event).toHaveBeenCalledWith("Anna");
  });
  //
  it("component should emit firstName on button click in template", () => {
    const event = spyOn(component.buttonClicked, "emit");
    const button = fixture.debugElement.query(By.css("button"));
    event.calls.reset();
    button.nativeElement.click();
    expect(event).toHaveBeenCalledWith("John");
  });
  //


  describe('getList', () => {
    it("getList return string array and set value to components items - callback Done", done => {
      fakeSecondDependencyService.observableExample.and.returnValue(of(['1', '2', '3']));
      component.getList().subscribe(result => {
        expect(result).toEqual(['1', '2', '3']);
        expect(component.items).toEqual(['1 item', '2 item', '3 item']);

        done();
      });
    });

    it("getList return error if service unavailable - callback Done", done => {
      fakeSecondDependencyService.observableExample.and.returnValue(throwError("Service error"));
      component.getList().subscribe(undefined, error => {
        expect(error).toBe("Service unavailable");
        done();
      });
    });
  });


});
