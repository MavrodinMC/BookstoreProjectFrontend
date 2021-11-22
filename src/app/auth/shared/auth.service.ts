import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterRequestPayload } from '../register/register-request.payload';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 BACKEND_URL = "http://localhost:8080";

  constructor(private httpClient: HttpClient) { }

  register(registerRequestPayload: RegisterRequestPayload): Observable<any> {

    return this.httpClient.post(this.BACKEND_URL + '/bookstore/register', registerRequestPayload, {responseType: 'text'});
  }



}
