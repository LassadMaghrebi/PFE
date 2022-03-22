import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-stadiums',
  templateUrl: './stadiums.component.html',
  styleUrls: ['./stadiums.component.scss']
})
export class StadiumsComponent implements OnInit {
  visible=false
  filter={}
  orderBy=""
  list:any=[]
  stadiums:any=[]
  constructor(private route:ActivatedRoute,private data:DataService,private http:HttpClient) {
    this.route.paramMap.subscribe(params => {
      this.orderBy=params.get('order')||""
      console.log(this.orderBy);
      
    })
    this.route.queryParams.subscribe(params => {
      this.filter=params
      console.log(this.filter);
    })

  }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/stadiums/find/all').subscribe(resp=>{
      this.stadiums=resp
      console.log(this.stadiums)
    })
    
  }
focus(e:any){
  this.list=[]
  this.http.post('http://localhost:3000/stadiums/find/name',{name:e.target.value}).subscribe((resp:any)=>{
    this.visible=true
    this.list=resp
  })
}

}
