import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountConfirmationPageComponent } from './auth/register/account-confirmation-page/account-confirmation-page.component';
import { RegisterComponent } from './auth/register/register.component';
import { SuccessPageComponent } from './auth/register/success-page/success-page.component';

const routes: Routes = [
  {path: "", redirectTo: '/', pathMatch: 'full'},
  {path: "register", component: RegisterComponent},
  {path:"success", component: SuccessPageComponent},
  {path:"accountConfirmation", component:AccountConfirmationPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
