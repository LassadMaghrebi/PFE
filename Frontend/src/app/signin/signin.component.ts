import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  playerSignInForm!: FormGroup;
  constructor(private formbuilder: FormBuilder,private auth:AuthentificationService, private router: Router) { }
  erreur = ""
  submitted = false
  loading=false
  ngOnInit(): void {
    this.playerSignInForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }
  submit() {
    this.submitted = true;
    if (this.playerSignInForm.valid) {
      console.log(this.playerSignInForm.value);
      this.erreur = ""
      this.auth.signin(this.playerSignInForm.value).subscribe((resp: any) => {
        console.log(resp)
        this.loading=false
        sessionStorage.setItem("token", resp.Token)
        this.auth.loggedIn.next(true)
        this.router.navigateByUrl('/home')
      }, err => {
        this.loading=false
        this.erreur = err.error.message
        console.log(err.error.message)
      })
    }
  }

}

