import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PasswordRequest } from '../forgot-password/password-request';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  BACKEND_URL = "http://localhost:8080";
  isTokenValid: boolean = false;

  constructor(private httpClient: HttpClient, private localStorage: LocalStorageService) { }

  
  forgotPassword(email: string): Observable<boolean> {
        
    return this.httpClient.post(this.BACKEND_URL + `/bookstore/generateReset`, email, {responseType: 'text'}).pipe(map(data => {

       this.localStorage.store('email', data);

        if (data === "") {
          return false;
        }

        return true;
    })); 
  }

  captureForgotPasswordToken(resetToken: string): Observable<any> {
      
    let params = new HttpParams().set('resetToken', resetToken);

    const options = {responseType: 'text', params};

    return this.httpClient.get<any>(this.BACKEND_URL + `/bookstore/forgot`, {params: params}).pipe(map(_ => {
      this.isTokenValid = true;
    }));
  }

  forgotPasswordReset(resetToken: string, passwordPayload: PasswordRequest): Observable<any> {

    let params = new HttpParams().set('resetToken', resetToken);

    const options = {responsetype: 'text', params};
              
     return this.httpClient.post<any>(this.BACKEND_URL + `/bookstore/resetPassword`, passwordPayload, options).pipe(map(_ => {
        console.log('password changed');
      }), catchError(this.handleError('an error occurred')));

  }

  private handleError(result: string) {

    return (error:any): Observable<string> => {
      
      console.log(console.error);

      return of(result as string);
    }
  }

}
