import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserPersonalDetailsComponent } from './app-user/user-personal-details/user-personal-details.component';
import { ForgotPasswordResetComponent } from './auth/forgot-password/forgot-password-reset/forgot-password-reset.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { AccountConfirmationPageComponent } from './auth/register/account-confirmation-page/account-confirmation-page.component';
import { RegisterComponent } from './auth/register/register.component';
import { SuccessPageComponent } from './auth/register/success-page/success-page.component';
import { TokenAlreadyUsedComponent } from './auth/register/token-already-used/token-already-used.component';
import { TokenExpiredMessageComponent } from './auth/register/token-expired-message/token-expired-message.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'forgot-password-reset', component: ForgotPasswordResetComponent},
  {path: 'success', component: SuccessPageComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'profile', component: UserPersonalDetailsComponent},
  {path: 'accountConfirmation', component: AccountConfirmationPageComponent},
  {path: '404', component: PageNotFoundComponent},
  {path: 'expired', component: TokenExpiredMessageComponent},
  {path: 'used', component: TokenAlreadyUsedComponent},
  {path: '**', redirectTo: '404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
