import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {

     this.authService.logout();
     this.router.navigate(['/login']);
     this.snackBar.open("Come back soon!", 'X', {
      duration: 5000,
      verticalPosition: 'top',
      panelClass: ['green-snackbar']
    });

  }

}
