import { Component, OnInit } from '@angular/core';
import { RestService } from './rest.service';
import { Users } from './Users';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private rs : RestService){}
  title = 'mini-foot';
  columns = ["id","nom","prenom","Phone"];
  values = ["id","nom","prenom","Phone"];
  users : Users[] = [];
  ngOnInit(): void {
    this.rs.getUsers().subscribe
    (
      (response)=>
      {
        this.users = response;
      },
      (error)=>
      {
        console.log("Error: "+error);
      }
    );
  }

  
}
