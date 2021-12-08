import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  isError: boolean = false;
  email: string = '';
  emailForm: FormGroup | any;

  constructor(private authService: AuthService, private snackBar: MatSnackBar) {
    
   }

  ngOnInit(): void {

    this.emailForm = new FormGroup (
      {
        
        email: new FormControl('', [Validators.required, Validators.email])
      
      })
  }

  forgotPassword() {

    this.email = this.emailForm.get('email').value;
    
    this.authService.forgotPassword(this.email).subscribe( data => {
          
      if (data) {
        this.snackBar.open("Alright, good job! Check your email for the reset password link!", 'X', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: ['green-snackbar']
        });
        this.emailForm.reset();
      } else {
        this.snackBar.open("Ups! It seems like this email is not associated with any account. Make sure you have typed the right email", 'X', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: ['red-snackbar']
        });
        this.isError = true;
      }
    });

  }

}
