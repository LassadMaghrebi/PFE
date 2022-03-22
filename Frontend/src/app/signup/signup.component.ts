import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  playerSignUpForm!: FormGroup;
  constructor(private formbuilder: FormBuilder,private router:Router,private auth:AuthentificationService) { }
  error=""
  emailError=""
  passwordError=""
  submitted = false
  ngOnInit(): void {
    this.playerSignUpForm = this.formbuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    })
  }
  t:any
  verif=false
  submit(){
    this.submitted = true;
    this.passwordError=""
    if(this.playerSignUpForm.value.password!=this.playerSignUpForm.value.confirmPassword) {this.passwordError="Wrong Confirm Password";}
    if(this.playerSignUpForm.value.password==this.playerSignUpForm.value.confirmPassword&&this.verif &&this.submitted &&this.playerSignUpForm.valid){       
      this.playerSignUpForm.value.confirmPassword=""     
    this.auth.signUp(this.playerSignUpForm.value).subscribe((resp:any)=>{
        this.router.navigateByUrl('/Signin')
      }, err => {
        this.error = err.error.message
      })
  }
  }
  verifEmail(){
    this.emailError=""
    if(this.playerSignUpForm.value.email!=""){
    this.auth.verifEmail(this.playerSignUpForm.value.email).subscribe((resp:any)=>{
      if(resp.message==false){
        this.emailError=""
        this.verif=true
      }else{
        this.verif=false
        this.emailError="Email Deja existe"
      }
    })
  }
}
}
