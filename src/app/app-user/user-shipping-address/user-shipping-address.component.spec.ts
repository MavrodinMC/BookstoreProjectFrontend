import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserShippingAddressComponent } from './user-shipping-address.component';

describe('UserShippingAddressComponent', () => {
  let component: UserShippingAddressComponent;
  let fixture: ComponentFixture<UserShippingAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserShippingAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserShippingAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
