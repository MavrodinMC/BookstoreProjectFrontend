import { TestBed } from '@angular/core/testing';

import { UserShippingAddressesService } from './user-shipping-addresses.service';

describe('UserShippingAddressesService', () => {
  let service: UserShippingAddressesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserShippingAddressesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
