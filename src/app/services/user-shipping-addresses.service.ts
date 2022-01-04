import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ShippingAddress } from '../app-user/user-shipping-addresses';

@Injectable({
  providedIn: 'root'
})
export class UserShippingAddressesService {

  BACKEND_URL = "http://localhost:8080";

  constructor(private httpClient: HttpClient) { }

  getUserShippingAddresses(email: string): Observable<ShippingAddress[]> {
         
    return this.httpClient.get<ShippingAddress[]>(this.BACKEND_URL + `/bookstore/shippingAddress/${email}`);
    
  }

  saveAddressForAUser(email: string, shippingAddress: ShippingAddress): Observable<ShippingAddress> {

    return this.httpClient.post<ShippingAddress>(this.BACKEND_URL + `/bookstore/save/shippingAddress/${email}`, shippingAddress);

  }
}
