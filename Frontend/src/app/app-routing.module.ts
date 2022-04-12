import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { StadiumComponent } from './stadium/stadium.component';
import { StadiumsComponent } from './stadiums/stadiums.component';

const routes: Routes = [
  {path:"Signup",component:SignupComponent},
  {path:"Signin",component:SigninComponent},
  {path:"forgot-password",component:ForgotPasswordComponent},
  {path:"reset-password/:token",component:ResetPasswordComponent},
  {path:"stadiums",component:StadiumsComponent},
  {path:"stadiums=/:id",component:StadiumComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
