
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { LoginRequestPayload } from './login.request.payload';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup | any;
  loginRequestPayload: LoginRequestPayload;
  isError: boolean = false;
  hidePassword: boolean = true;

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {
    
    this.loginRequestPayload = {
      email: '',
      password: ''
    }

   }

  ngOnInit() {

    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  login() {
    
    this.loginRequestPayload.email = this.loginForm.get('email')?.value;
    this.loginRequestPayload.password = this.loginForm.get('password')?.value;

    this.authService.login(this.loginRequestPayload).subscribe(data => {

      if (data) {
        this.router.navigate([''], {queryParams: {loginSuccess: 'true'}});
        this.snackBar.open("Welcome! We've missed having you around!", 'X', {
          duration: 5000,
          verticalPosition: 'top',
          panelClass: ['green-snackbar']
        });
      } else {
        this.router.navigate(['/login'], {queryParams: {loginSuccess: 'false'}})
        this.isError = true;
      }
    });
  }

}
