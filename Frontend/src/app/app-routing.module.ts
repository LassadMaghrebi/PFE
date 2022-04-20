import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';
import { OwnerDashboardComponent } from './owner-dashboard/owner-dashboard.component';
import { OwnerSigninComponent } from './owner-signin/owner-signin.component';
import { OwnerSignupComponent } from './owner-signup/owner-signup.component';
import { OwnerReservationsComponent } from './Owner/owner-reservations/owner-reservations.component';
import { OwnerStadiumsComponent } from './Owner/owner-stadiums/owner-stadiums.component';
import { OwnerdashboardComponent } from './Owner/ownerdashboard/ownerdashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SearchComponent } from './search/search.component';
import { AdminGuard } from './services/admin.guard';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { StadiumDetailsComponent } from './stadium-details/stadium-details.component';
import { StadiumComponent } from './stadium/stadium.component';
import { StadiumsComponent } from './stadiums/stadiums.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:"home",component:HomeComponent},
  {path:"Signup",component:SignupComponent},
  {path:"profile",component:ProfileComponent},
  {path:"Signin",component:SigninComponent},
  {path:"reset-password/:token",component:ResetPasswordComponent},
  {path:"forgot-password",component:ForgotPasswordComponent},
  {path:"owner-Signin",component:OwnerSigninComponent},
  {path:"owner-Signup",component:OwnerSignupComponent},
  {path:"owner-Dashboard",component:OwnerDashboardComponent},
  {path:"admin-Dashboard",component:AdminDashboardComponent,/*canActivate:[AdminGuard]*/},
  {path:"stadiums",component:StadiumsComponent},
  {path:"stadiums-Details/:stadiumId",component:StadiumDetailsComponent},
  {path:"stadium/:stadiumId",component:StadiumComponent},
  {path:"search",component:SearchComponent},
  {path:"test",component:TestComponent},
  {path:"map",component:MapComponent},
  {path:"Owner",component:OwnerdashboardComponent,children:[
    {path:"Dashboard" ,component:OwnerStadiumsComponent},
    {path:"reservations" ,component:OwnerReservationsComponent},
    {path:"stadiums" ,component:OwnerStadiumsComponent}
  ]},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
