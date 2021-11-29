import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RegisterRequestPayload } from '../register/register-request.payload';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  BACKEND_URL = "http://localhost:8080";

  constructor(private httpClient: HttpClient) { }

  register(registerRequestPayload: RegisterRequestPayload): Observable<any> {

    return this.httpClient.post(this.BACKEND_URL + '/bookstore/register', registerRequestPayload, {responseType: 'text'}).pipe
    (tap(_ =>console.log('registered')), catchError(this.handleError<string>('error')));
  }

  captureActivationToken(token: string): Observable<any> {

    let params = new HttpParams().set('token', token);

    return this.httpClient.get<any>(this.BACKEND_URL + `/bookstore/accountConfirmation`,{params: params}).pipe
    (tap(_ => console.log('activated')), catchError(this.handleError<string>('error')));

  }
   
  private handleError<T>(result: T) {

    return (error:any): Observable<T> => {
      
      console.log(console.error);

      return of(result as T);
    }
  }

}
