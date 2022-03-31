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
  verif=false
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
  submit(){
    this.submitted = true;
    this.passwordError=""
    this.error =""
    if(this.playerSignUpForm.value.password!=this.playerSignUpForm.value.confirmPassword)this.passwordError="Wrong Confirm Password"
    if(this.playerSignUpForm.value.password===this.playerSignUpForm.value.confirmPassword&&/*this.verif*/true &&this.submitted &&this.playerSignUpForm.valid){ 
      this.playerSignUpForm.value.confirmPassword=""    
      console.log(this.playerSignUpForm.value);  
    this.auth.signUp(this.playerSignUpForm.value).subscribe(resp=>{
      
         this.router.navigateByUrl('/home')
      }, err => {
        this.error = err.error.message
      })
  }
  }
  verifEmail(){
    this.emailError=""
    if(this.playerSignUpForm.value.email!=""){
    this.auth.verifEmail(this.playerSignUpForm.value.email).subscribe((resp:any)=>{
      console.log(resp)
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
