import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-stadium',
  templateUrl: './stadium.component.html',
  styleUrls: ['./stadium.component.scss']
})
export class StadiumComponent implements OnInit {
  url="https://maps.google.com/maps?q=33.362876,%2010.467702&t=&z=13&ie=UTF8&iwloc=&output=embed"
  stadiumId:string=""
  stadium:any
  constructor(private data:DataService,private route:ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.stadiumId=params.get('stadiumId')||""
    })
    this.data.getStadiumById(this.stadiumId).subscribe(res=>{
      this.stadium=res
      console.log(this.stadium);
    })
  }

  ngOnInit(): void {
  }
}
