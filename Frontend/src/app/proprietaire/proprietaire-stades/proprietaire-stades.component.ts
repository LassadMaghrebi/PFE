import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-proprietaire-stades',
  templateUrl: './proprietaire-stades.component.html',
  styleUrls: ['./proprietaire-stades.component.scss']
})
export class ProprietaireStadesComponent implements OnInit {
  StadeForm!: FormGroup;
  constructor(private formbuilder: FormBuilder,private data:DataService,private http:HttpClient) { }
  rating=3.5
  loading=true
  stades:any=[]
  images:any=[]
  ville=["Ariana", "Béja", "Ben Arous", "Bizerte", "Gabes", "Gafsa", "Jendouba",
  "Kairouan", "Kasserine", "Kebili", "Manouba", "Kef", "Mahdia", "Médenine", "Monastir",
  "Nabeul", "Sfax", "Sidi Bouzid", "Siliana", "Sousse", "Tataouine", "Tozeur", "Tunis", "Zaghouan"]
  
  ngOnInit(): void {
    this.StadeForm = this.formbuilder.group({
      nom: ['', [Validators.required, Validators.email]],
      ville: ['', [Validators.required]],
      rue: ['', [Validators.required]],
      coordonnes: ['', [Validators.required]],
      terrains: ['', [Validators.required]],
      capacite: ['', [Validators.required]],
    })

    this.data.getProprietaireStade().subscribe(res=>{
      this.stades=res
      console.log(res);
      this.loading=false
    })

  }
  change(e:any){
    console.log(e.target.files);
    this.images=e.target.files
  }
  ajoutStade(){

    const formData = new FormData();
    for (let i = 0; i < this.images.length; i++) {
      formData.append('image',this.images[i]);    
    }
    formData.append('nom',this.StadeForm.value.nom); 
    formData.append('ville',this.StadeForm.value.ville); 
    formData.append('rue',this.StadeForm.value.rue); 
    formData.append('coordonnes',this.StadeForm.value.coordonnes); 
    formData.append('terrains',this.StadeForm.value.terrains); 
    formData.append('capacite',this.StadeForm.value.capacite); 
    console.log(formData.getAll("image"));
    this.data.addStade(formData).subscribe(res=>{
    
  })
  }

}
