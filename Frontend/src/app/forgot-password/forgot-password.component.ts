import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  EmailForm!: FormGroup;
  error = ""
  submitted = false
  constructor(private formbuilder: FormBuilder, private router: Router, private auth: AuthentificationService) { }

  ngOnInit(): void {
    this.EmailForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
    })
    
  }
  submit(){
    
    this.submitted = true;
    this.error=""
    // stop here if form is invalid
    if (this.EmailForm.valid) {
      this.auth.forgotPassword(this.EmailForm.value.email).subscribe(res=>{
        this.router.navigateByUrl('/Signin')
        
      },
      err=>{
        console.log(err.error.message);
        throw err
      })
      
    }else this.error="wrong confirm Password"
  }
}
