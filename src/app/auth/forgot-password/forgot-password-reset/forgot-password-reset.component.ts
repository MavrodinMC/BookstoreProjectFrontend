import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { ForgotPasswordService } from '../../shared/forgot-password.service';
import { PasswordRequest } from '../password-request';

@Component({
  selector: 'app-forgot-password-reset',
  templateUrl: './forgot-password-reset.component.html',
  styleUrls: ['./forgot-password-reset.component.css']
})
export class ForgotPasswordResetComponent implements OnInit {

  passwordRequestPayload: PasswordRequest | any;
  forgotPasswordForm: FormGroup | any;
  resetToken: string | any;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private snackBar: MatSnackBar, private forgotPasswordService: ForgotPasswordService) { 
    this.passwordRequestPayload = {
      newPassword: '',
      confirmNewPassword: ''
    }
  }

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(params => {
      const backendResetToken = params['resetToken'];
      this.resetToken = backendResetToken;
    });

    this.forgotPasswordService.captureForgotPasswordToken(this.resetToken).subscribe();

    this.forgotPasswordForm = new FormGroup(
      {
        newPassword: new FormControl('', Validators.required),
        confirmNewPassword: new FormControl('', [Validators.required])
      }
    )
  }

  resetPassword() {
      
    this.passwordRequestPayload.newPassword = this.forgotPasswordForm.get('newPassword').value;
    this.passwordRequestPayload.confirmNewPassword = this.forgotPasswordForm.get('confirmNewPassword').value;

    if (this.passwordRequestPayload.newPassword !== this.passwordRequestPayload.confirmNewPassword) {
      this.snackBar.open("Passwords must match!", 'X', {
        duration: 5000,
        verticalPosition: 'top',
        panelClass: ['red-snackbar']
      });
    } else {
      this.forgotPasswordService.forgotPasswordReset(this.resetToken, this.passwordRequestPayload).subscribe();
    this.snackBar.open("Password changed! Try to log in with your new password!", 'X', {
      duration: 5000,
      verticalPosition: 'top',
      panelClass: ['green-snackbar']
    });
      this.router.navigate(['/login']);
      this.forgotPasswordForm.reset();
    }

  }

}
