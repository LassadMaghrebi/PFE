import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-liste-utilisateurs',
  templateUrl: './liste-utilisateurs.component.html',
  styleUrls: ['./liste-utilisateurs.component.scss']
})
export class ListeUtilisateursComponent implements OnInit {

  constructor(private auth:AuthentificationService) { }
  utilisateurs:any=[]
  ngOnInit(): void {
    this.getAllUsers()
  }

  getAllUsers(){
    this.utilisateurs=[]
    this.auth.getUsers().subscribe(res=>{
      this.utilisateurs=res
    })
  }
  gereCompte(e:any,u:string){

    if (e.checked){
      this.auth.activerCompte(u).subscribe(res=>{
        console.log(res);
        this.getAllUsers()
      })
    }else{
      this.auth.desactiverCompte(u).subscribe(res=>{
        console.log(res);
        this.getAllUsers()
      })
    }
  }

}
