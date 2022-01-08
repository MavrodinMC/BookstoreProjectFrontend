import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserPersonalDetailsPayload } from '../app-user/user-personal-details';

@Injectable({
  providedIn: 'root'
})
export class UserPersonalDetailsService {

  BACKEND_URL = "http://localhost:8080/bookstore";

  constructor(private httpClient: HttpClient) { }

  getUserDetailsByEmail(email: string): Observable<UserPersonalDetailsPayload> {
         
    return this.httpClient.get<UserPersonalDetailsPayload>(this.BACKEND_URL + `/user/details/${email}`);
  }

  updateuserDetailsById(id: number, userPersonalDetailsPayload: UserPersonalDetailsPayload): Observable<UserPersonalDetailsPayload> {

    return this.httpClient.put<UserPersonalDetailsPayload>(this.BACKEND_URL + `/user/update/details/${id}`, userPersonalDetailsPayload);
  }
}
