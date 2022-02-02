import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../shared/auth.service';
import { RegisterRequestPayload } from './register-request.payload';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerRequestPayload: RegisterRequestPayload;
  registerForm: FormGroup | any;
  hidePassword: boolean = true;

  constructor(private authService: AuthService, private router: Router) {
    this.registerRequestPayload = {
      username: '',
      email: '',
      password: ''
    }
   }
   

  ngOnInit(): void {
    this.registerForm = new FormGroup (
      {
        username: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
      })
  }

  register() {
    this.registerRequestPayload.username =
    this.registerForm.get('username').value;
    this.registerRequestPayload.email =
    this.registerForm.get('email').value;
    this.registerRequestPayload.password =
    this.registerForm.get('password').value;

    this.authService.register(this.registerRequestPayload)
    .subscribe(() => {
      this.router.navigate(['/success'],
       {queryParams: {registered: 'true'}});
    });

  }

}
