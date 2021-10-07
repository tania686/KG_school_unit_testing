import { TestBed } from '@angular/core/testing';

import { SpyTestingService } from './spy-testing.service';
import { FirstDependencyService } from './first-dependency.service';

describe('SpyTestingService', () => {
  let service: SpyTestingService;
  // const fakeFirstDependencyService = {
  //   returnValue: jasmine.createSpy("returnValue"),
  //   initValue: jasmine.createSpy("initValue"),
  //   initValue2: jasmine.createSpy("initValue2"),
  // };

  // Another way of creating spy
  const fakeFirstDependencyService = jasmine.createSpyObj('fakeFirstDependencyService', ["initValue", "returnValue", "initValue2"]);


  // Setting properties with createSpyObj
  Object.defineProperty(fakeFirstDependencyService, "age", { get: () => 0, set: () => {}, configurable: true });


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: FirstDependencyService, useValue: fakeFirstDependencyService }]
    });
    service = TestBed.inject(SpyTestingService);

    fakeFirstDependencyService.returnValue.and.returnValue("two");

    // Another way of setting return value of spy
    // fakeFirstDependencyService.returnValue.and.callFake(() => "two");
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  //
  it("method getIndex should return 2", () => {
    const result = service.getIndex();
    expect(result).toBe(2);
  });
  //
  it("should return array value by provided index", () => {
    const result = service.getValue(1);
    expect(result).toBe("two");
  });
  //
  it("should return array value by provided index 0", () => {
    fakeFirstDependencyService.returnValue.and.returnValue("one");
    const result = service.getValue(0);
    expect(result).toBe("one");
  });
  //
  //
  it("should return array value by getIndex method value", () => {
    fakeFirstDependencyService.returnValue.and.returnValue("one");

    // set spy for service method getIndex
    spyOn(service, "getIndex").and.returnValue(0);
    const result = service.getValue(service.getIndex());
    expect(result).toBe("one");
  });
  //
  it("method sayHi() should call dependency method initValue2", () => {
    service.sayHi("some text");
    expect(fakeFirstDependencyService.initValue2).toHaveBeenCalled();
    expect(fakeFirstDependencyService.initValue2).toHaveBeenCalledTimes(1);
    expect(fakeFirstDependencyService.initValue2).toHaveBeenCalledWith("some text");
  });

  it("method returnAge should return provided value", () => {
    spyOnProperty(fakeFirstDependencyService, "age", "get").and.returnValue(18);
    const result = service.returnAge();
    expect(result).toBe(18);
  });

});
