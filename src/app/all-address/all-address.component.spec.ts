import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAddressComponent } from './all-address.component';

describe('AllAddressComponent', () => {
  let component: AllAddressComponent;
  let fixture: ComponentFixture<AllAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
