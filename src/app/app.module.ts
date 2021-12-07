import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './angular-material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './auth/register/register.component';
import { SuccessPageComponent } from './auth/register/success-page/success-page.component';
import { AccountConfirmationPageComponent } from './auth/register/account-confirmation-page/account-confirmation-page.component';
import { ActivationTokenInterceptor } from './activation-token-interceptor';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TokenExpiredMessageComponent } from './auth/register/token-expired-message/token-expired-message.component';
import { TokenAlreadyUsedComponent } from './auth/register/token-already-used/token-already-used.component';
import { LoginComponent } from './auth/login/login.component';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { LogoutComponent } from './auth/logout/logout.component';
import { TokenInterceptor } from './auth-token-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    SuccessPageComponent,
    AccountConfirmationPageComponent,
    PageNotFoundComponent,
    TokenExpiredMessageComponent,
    TokenAlreadyUsedComponent,
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    NgxWebstorageModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ActivationTokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  schemas :[CUSTOM_ELEMENTS_SCHEMA]

})
export class AppModule { }
