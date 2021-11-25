import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { SuccessPageComponent } from './auth/register/success-page/success-page.component';

const routes: Routes = [
  {path: "", redirectTo: '/', pathMatch: 'full'},
  {path: "register", component: RegisterComponent},
  {path:"success", component: SuccessPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
