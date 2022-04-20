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
  loading=true
  list:any=[]
  stadiums:any=[]
  activatePage=1
  ville=["Ariana", "Béja", "Ben Arous", "Bizerte", "Gabes", "Gafsa", "Jendouba",
  "Kairouan", "Kasserine", "Kebili", "Manouba", "Kef", "Mahdia", "Médenine", "Monastir",
  "Nabeul", "Sfax", "Sidi Bouzid", "Siliana", "Sousse", "Tataouine", "Tozeur", "Tunis", "Zaghouan"]
  pages:Array<Number>=[1,2,3,4,5,6,7,8,9,10,11,12,13]
  orderBy=""
  filter={}
  constructor(private route:ActivatedRoute,private data:DataService,private http:HttpClient) {
    this.route.queryParams.subscribe(params => {
      if(params.page!=null){
        this.activatePage=Number(params.page)
        if(this.activatePage==0){
          this.activatePage=1
        }
      }
      this.filter=params
      console.log(this.filter);
      this.getAllStadiums()
    })
/*      if(this.activatePage>this.pages){
        console.log(this.pages)
        this.route.navigateByUrl('/home/2')
      }*/
    
  }

  ngOnInit(): void {
    //this.getAllStadiums()
  }
focus(e:any){
  this.list=[]
  this.http.post('http://localhost:3000/stadiums/name',{name:e.target.value}).subscribe((resp:any)=>{
    this.visible=true
    this.list=resp
  })
}
getAllStadiums(){
  this.loading=true
  this.stadiums=[]
  this.http.get('http://localhost:3000/stadiums/all',{params:this.filter}).subscribe(resp=>{
    console.log(resp);
    this.stadiums=resp
    setTimeout(() => {
      this.loading=false
    }, 2000);
  },err=>{
    this.loading=false
  })
}

}
