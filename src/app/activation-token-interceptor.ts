import { Injectable } from "@angular/core";
import {
    HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { AuthService } from "./auth/shared/auth.service";
import { ThisReceiver } from "@angular/compiler";

@Injectable()
export class ActivationTokenInterceptor implements HttpInterceptor {
  constructor(public router: Router, private authService: AuthService) {}

  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
        tap(evt => {
            
        }), catchError((err:any) => {
            if (err.status === 404) {
                this.router.navigate(['/404'], {skipLocationChange: true});
            } else if (err.status === 410) {
                this.router.navigate(['/expired'], {skipLocationChange: true});
            } else if (err.status === 400) {
              this.router.navigate(['/used'], {skipLocationChange: true});
            }
            return of(err);
        }));
  }
}
