import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-account-confirmation-page',
  templateUrl: './account-confirmation-page.component.html',
  styleUrls: ['./account-confirmation-page.component.css']
})
export class AccountConfirmationPageComponent implements OnInit {

  token: string | any;


  constructor(private authService: AuthService, private route: ActivatedRoute) { }


  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      const backendToken = params['token'];
      this.token = backendToken;
    });

    this.authService.captureActivationToken(this.token).subscribe();
  }

  
}
