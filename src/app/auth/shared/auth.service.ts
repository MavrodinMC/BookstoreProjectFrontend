import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RegisterRequestPayload } from '../register/register-request.payload';
import { catchError, map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  BACKEND_URL = "http://localhost:8080";
  isTokenValid = false;

  constructor(private httpClient: HttpClient) { }

  register(registerRequestPayload: RegisterRequestPayload): Observable<any> {

    return this.httpClient.post(this.BACKEND_URL + '/bookstore/register', registerRequestPayload, {responseType: 'text'}).pipe
    (map(_ => console.log('registered')), catchError(this.handleError('error')));
  }

  captureActivationToken(token: string): Observable<any> {

    let params = new HttpParams().set('token', token);

    const options = {responsetype: 'text', params};

    return this.httpClient.get<any>(this.BACKEND_URL + `/bookstore/accountConfirmation`,options).pipe
    (map(_ => {
      console.log('activated');
      this.isTokenValid = true;
    }));
  }
   
  private handleError(result: string) {

    return (error:any): Observable<string> => {
      
      console.log(console.error);

      return of(result as string);
    }
  }

}
