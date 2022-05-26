import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-proprietaire-stades',
  templateUrl: './proprietaire-stades.component.html',
  styleUrls: ['./proprietaire-stades.component.scss']
})
export class ProprietaireStadesComponent implements OnInit {

  constructor() { }
  rating=3.5
  loading=true
  stades=[]
  ville=["Ariana", "Béja", "Ben Arous", "Bizerte", "Gabes", "Gafsa", "Jendouba",
  "Kairouan", "Kasserine", "Kebili", "Manouba", "Kef", "Mahdia", "Médenine", "Monastir",
  "Nabeul", "Sfax", "Sidi Bouzid", "Siliana", "Sousse", "Tataouine", "Tozeur", "Tunis", "Zaghouan"]
  ngOnInit(): void {
    
  }

}
