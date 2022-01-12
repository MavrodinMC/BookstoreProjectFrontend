import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ShippingAddress } from '../app-user/user-shipping-addresses';

@Injectable({
  providedIn: 'root'
})
export class UserShippingAddressesService {

  BACKEND_URL = "http://localhost:8080/bookstore";

  constructor(private httpClient: HttpClient) { }

  shippingAddressForm: FormGroup = new FormGroup({
    
    addressId: new FormControl(null),
    fullName: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    zipCode: new FormControl(''),
    isDefault: new FormControl(false)

  })

  getUserShippingAddresses(email: string): Observable<ShippingAddress[]> {
         
    return this.httpClient.get<ShippingAddress[]>(this.BACKEND_URL + `/shippingAddress/${email}`);
    
  }

  saveAddressForAUser(email: string, shippingAddress: ShippingAddress): Observable<ShippingAddress> {

    return this.httpClient.post<ShippingAddress>(this.BACKEND_URL + `/save/shippingAddress/${email}`, shippingAddress);

  }

  deleteAddressForAUser(shippingAddressId: number, email: string): Observable<void> {

    return this.httpClient.delete<void>(this.BACKEND_URL + `/shippingAddress/delete/${shippingAddressId}/${email}`);
  }

  updateAddressForAUser(shippingAddress: ShippingAddress): Observable<void> {

    return this.httpClient.put<void>(this.BACKEND_URL + `/shippingAddress/update`, shippingAddress);
  }
  
  populateShippingAddressUpdateForm(shippingAddress: any) {
    
    this.shippingAddressForm.setValue(shippingAddress);
    
  }
}
