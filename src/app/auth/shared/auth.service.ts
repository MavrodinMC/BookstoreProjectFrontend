import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { RegisterRequestPayload } from '../register/register-request.payload';
import { catchError, map, tap} from 'rxjs/operators';
import { LocalStorageService } from 'ngx-webstorage';
import { LoginRequestPayload } from '../login/login.request.payload';
import { LoginResponsePayload } from '../login/login.response.payload';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  BACKEND_URL = "http://localhost:8080";
  isTokenValid = false;
  isAuthenticated: boolean = false;
  private loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());

  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    email: this.getEmail()
  }

  constructor(private httpClient: HttpClient, private localStorage: LocalStorageService) { }

  register(registerRequestPayload: RegisterRequestPayload): Observable<any> {

    return this.httpClient.post(this.BACKEND_URL + '/bookstore/register', registerRequestPayload, {responseType: 'text'}).pipe
    (map(_ => console.log('registered')), catchError(this.handleError('error')));
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {

    return this.httpClient.post<LoginResponsePayload>(this.BACKEND_URL + `/bookstore/login`, loginRequestPayload).pipe(map(data => {

        this.localStorage.store('authenticationToken', data.authenticationToken);
        this.localStorage.store('email', data.email);
        this.localStorage.store('refreshToken', data.refreshToken);
        this.localStorage.store('expiresAt', data.expiresAt);

        if (data.authenticationToken === null) {
          this.isAuthenticated = false;
          return false;
        }
        
        this.isAuthenticated = true;
        this.loginStatus.next(true);
        this.localStorage.store('loginstatus', '1');
        return true;
        
    }));
    
  }

  logout() {

    this.httpClient.post(this.BACKEND_URL + `/bookstore/logout`, this.getRefreshToken(),
      { responseType: 'text' })
      .subscribe(()=> {
      }, error => {
        throwError(error);
      })

    this.loginStatus.next(false);
    this.isAuthenticated = false;
    this.localStorage.clear('authenticationToken');
    this.localStorage.clear('email');
    this.localStorage.clear('refreshToken');
    this.localStorage.clear('expiresAt');
    this.localStorage.store("loginStatus", "0");

  }

  refreshToken() {
    
    return this.httpClient.post<LoginResponsePayload>(this.BACKEND_URL + `/bookstore/refresh/token`, this.refreshTokenPayload).pipe(tap(response => {

      this.localStorage.clear('authenticationToken');
      this.localStorage.clear('expiresAt');

      this.localStorage.store('authenticationToken', response.authenticationToken);
      this.localStorage.store('expiresAt', response.expiresAt);

    }));
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

  getEmail() {
    return this.localStorage.retrieve('email');
  } 
  
  getRefreshToken() {
    return this.localStorage.retrieve('refreshToken');
  }

  getJwtToken() {
    return this.localStorage.retrieve('authenticationToken');
  }

  checkLoginStatus(): boolean {

    var loginCookie = this.localStorage.retrieve("loginStatus");

    if (loginCookie == "1") {
      this.isAuthenticated = true;
      return true;
    }
    return false;

  }


  private handleError(result: string) {

    return (error:any): Observable<string> => {
      
      console.log(console.error);

      return of(result as string);
    }
  }
  
}






