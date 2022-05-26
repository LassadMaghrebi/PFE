import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  constructor(private http:HttpClient,public toastr: ToastrService,private auth:AuthentificationService,private formbuilder: FormBuilder) {
  }
  changeForm!: FormGroup;
  image:any
  user:any
  ngOnInit(): void {
    this.changeForm = this.formbuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
    })
    this.auth.getUserData().subscribe(res=>{
      this.user=res
      })
  }

  showSuccess(message:string){
    this.toastr.success(message, 'Modification Success', {
   timeOut: 3000,
    });
   }
  showError(message:string){
    this.toastr.error(message, 'Erreur de modification !', {
   timeOut: 3000,
    });
   }


  change(e:any){
    this.image=e.target.files[0]
  }
  save(){
    this.showSuccess("votre image a etait changer")
    const formData = new FormData();
    formData.append('image',this.image);
    this.http.post("http://localhost:3000/auth/image",formData).subscribe(res=>{
      
    this.user.image=res
  })
  }
  updatePassword(){
    this.showSuccess("votre mot de passe a etait changer")
    this.changeForm.value.id=sessionStorage.getItem("id")
    this.http.post("http://localhost:3000/auth/password",this.changeForm.value).subscribe(res=>{
    })
  }
}
