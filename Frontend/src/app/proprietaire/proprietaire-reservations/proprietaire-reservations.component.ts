import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-proprietaire-reservations',
  templateUrl: './proprietaire-reservations.component.html',
  styleUrls: ['./proprietaire-reservations.component.scss']
})
export class ProprietaireReservationsComponent implements OnInit {

  hours=["8 AM","9 AM","10 AM","11 AM","12 AM","13 PM","14 PM","15 PM","16 PM","17 PM","18 PM","19 PM","20 PM","21 PM","22 PM","23 PM"]
  weekDays=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
  reservation:any[]=[]
  today=new Date
  days:Date[]=[]
  constructor(private http:HttpClient,private elRef:ElementRef,private data:DataService) { 
    
      // this.today=new Date("2022-04-17T03:24:00")
      this.today=new Date("2022-05-28T03:24:00")      
      for (let i = 0; i < 7; i++) {
        this.days[i]=new Date()
        this.days[i].setDate(this.today.getDate()+i)
      }
    
  }
  
  ngOnInit(): void {
    this.getAllReservations()
    // this.reservation.push({date:new Date('2022-05-28T09:20:00'),id:"azdlakd"})
    // console.log(this.reservation[0].date.toLocaleDateString());
    // console.log(this.days[0].toLocaleDateString());
    // console.log(this.reservation);
    
  }
  getAllReservations(){
    this.reservation=[]
    this.http.get("http://localhost:3000/reservation/all").subscribe((res:any)=>{
      res.forEach((element:any) => {
        this.http.get("http://localhost:3000/auth/name/"+element.joueurId).subscribe((resp:any)=>{
          console.log(resp);
          
          element.joueur= resp
          element.date=new Date(element.date)
          element.date.setHours(element.date.getHours()-1)
          console.log(element.date);
          this.reservation.push(element)
        })

      });
      console.log(this.reservation);
      
      // res[0].date=new Date(res[0].date)
      // this.reservation=res
      // console.log(res[0].date);
      // console.log(res[0].date.getDay());
    })
  }
  getPosition(a:any){
    let x=0;
    this.reservation.forEach(res => {
      if(res.date.toLocaleDateString()==a.date.toLocaleDateString()){
        if(res.date<a.date){
          x=x-90
        }
      }
    });
    return (x+a.date.getHours()*60+a.date.getMinutes())-480
  }
  back(){
    this.reservation=[]
    this.today.setDate(this.today.getDate()-7)
    let p=this.today.toLocaleDateString().split('/')
    let date=p[2]+'-'+p[1]+'-'+p[0]
    this.http.get("http://localhost:3000/reservation/date/"+date).subscribe((res:any)=>{
      res.forEach((element:any) => {
        this.http.get("http://localhost:3000/auth/name/"+element.joueurId).subscribe((resp:any)=>{
          element.joueur= resp
          element.date=new Date(element.date)
          element.date.setHours(element.date.getHours()-1)
          this.reservation.push(element)
        })

      });
    })
    let d=new Date(this.today)
    this.days=[]
    for (let i = 0; i < 7; i++) {
      this.days[i]=new Date(d)
      d.setDate(d.getDate()+1)
    }
  }
  next(){
    this.reservation=[]
    this.today.setDate(this.today.getDate()+7)
    let p=this.today.toLocaleDateString().split('/')
    let date=p[2]+'-'+p[1]+'-'+p[0]
    this.http.get("http://localhost:3000/reservation/date/"+date).subscribe((res:any)=>{
      res.forEach((element:any) => {
        this.http.get("http://localhost:3000/auth/name/"+element.joueurId).subscribe((resp:any)=>{
          element.joueur= resp
          element.date=new Date(element.date)
          element.date.setHours(element.date.getHours()-1)
          this.reservation.push(element)
        })
      });
    })
    let d=new Date(this.today)
    this.days=[]
    for (let i = 0; i < 7; i++) {
      this.days[i]=new Date(d)
      d.setDate(d.getDate()+1)
    }
  }





  accepter(id:string){
    this.data.accepterReservation(id).subscribe(res=>{
      console.log(res);
      
      this.getAllReservations()
    })
  }
  refuser(id:string){
    this.data.refuserReservation(id).subscribe(res=>{
      this.getAllReservations()
    })
  }
}