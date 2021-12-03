import { Component } from '@angular/core';
import { AuthService } from './auth/shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isMenuOpen: boolean = false;
  title = 'Bookstore';

  constructor(private authService: AuthService) {}

  public onSidenavClick(): void {
    this.isMenuOpen = false;
  }

  showOrHideButtons(): boolean {
    return this.authService.isAuthenticated;
  }

  getLoggedInUsername(): string {
    return this.authService.getEmail();
  }

}
