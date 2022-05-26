import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-stade',
  templateUrl: './stade.component.html',
  styleUrls: ['./stade.component.scss']
})
export class StadeComponent implements OnInit {

  url="https://maps.google.com/maps?q=33.362876,%2010.467702&t=&z=13&ie=UTF8&iwloc=&output=embed"
  stadeId:string=""
  stade:any
  constructor(private data:DataService,private route:ActivatedRoute,private http:HttpClient) {
    this.route.paramMap.subscribe(params => {
      this.stadeId=params.get('id')||""
    })
    this.http.get("http://localhost:3000/stade/id/"+this.stadeId).subscribe(res=>{
      this.stade=res
      
      console.log(this.stade);
    })
  }
  ngOnInit(): void {
  }

}
