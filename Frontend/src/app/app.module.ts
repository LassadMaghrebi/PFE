import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OwnerDashboardComponent } from './owner-dashboard/owner-dashboard.component';
import { OwnerSigninComponent } from './owner-signin/owner-signin.component';
import { OwnerSignupComponent } from './owner-signup/owner-signup.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { FooterComponent } from './footer/footer.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { HomeComponent } from './home/home.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { TestComponent } from './test/test.component';
import { StadiumsComponent } from './stadiums/stadiums.component';
import { MapComponent } from './map/map.component';
import { SearchComponent } from './search/search.component';
import { StadiumComponent } from './stadium/stadium.component';
@NgModule({
  declarations: [
    AppComponent,
    OwnerDashboardComponent,
    OwnerSigninComponent,
    OwnerSignupComponent,
    SigninComponent,
    SignupComponent,
    NavbarComponent,
    ProfileComponent,
    FooterComponent,
    ResetPasswordComponent,
    HomeComponent,
    ForgotPasswordComponent,
    AdminDashboardComponent,
    TestComponent,
    StadiumsComponent,
    MapComponent,
    SearchComponent,
    StadiumComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
