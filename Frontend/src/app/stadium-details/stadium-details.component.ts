import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-stadium-details',
  templateUrl: './stadium-details.component.html',
  styleUrls: ['./stadium-details.component.scss']
})
export class StadiumDetailsComponent implements OnInit {
  stadiumId:string=""
  stadium:any
  constructor(private http:HttpClient,private formbuilder: FormBuilder,private route:ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.stadiumId=params.get('stadiumId')||""
    })
  }
  imageForm!: FormGroup;
  ngOnInit(): void {
    this.imageForm = this.formbuilder.group({
      image: [[], Validators.required]
    })
  }
  upload(e:any){
    this.imageForm.value.image=e.target.files
  }
  submit(){
    const formData = new FormData();
    console.log(this.imageForm.value.image[0].type);
    
    formData.append('image', this.imageForm.value.image);
    formData.append('image', this.imageForm.value.image[1]);
    console.log(formData.getAll('image'));
    
    this.http.post <HttpEvent<any>>('http://localhost:3000/auth/upload',formData,{reportProgress: true,
    responseType: 'json'}).subscribe(res=>{
      console.log(res);
    })    
    
  }

}
