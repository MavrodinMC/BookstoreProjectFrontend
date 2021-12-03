import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AccountConfirmationPageComponent } from './auth/register/account-confirmation-page/account-confirmation-page.component';
import { RegisterComponent } from './auth/register/register.component';
import { SuccessPageComponent } from './auth/register/success-page/success-page.component';
import { TokenAlreadyUsedComponent } from './auth/register/token-already-used/token-already-used.component';
import { TokenExpiredMessageComponent } from './auth/register/token-expired-message/token-expired-message.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {path: "", redirectTo: '/', pathMatch: 'full'},
  {path: "register", component: RegisterComponent},
  {path: "login", component: LoginComponent},
  {path:"success", component: SuccessPageComponent},
  {path:"accountConfirmation", component: AccountConfirmationPageComponent},
  {path: "404", component: PageNotFoundComponent},
  {path: "expired", component: TokenExpiredMessageComponent},
  {path: "used", component: TokenAlreadyUsedComponent},
  {path: "**", redirectTo: "404"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
