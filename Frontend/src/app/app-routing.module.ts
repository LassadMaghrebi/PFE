import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwnerDashboardComponent } from './owner-dashboard/owner-dashboard.component';
import { OwnerSigninComponent } from './owner-signin/owner-signin.component';
import { OwnerSignupComponent } from './owner-signup/owner-signup.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path:"Signup",component:SignupComponent},
  {path:"Signin",component:SigninComponent},
  {path:"owner-Signin",component:OwnerSigninComponent},
  {path:"owner-Signup",component:OwnerSignupComponent},
  {path:"owner-Dashboard",component:OwnerDashboardComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
