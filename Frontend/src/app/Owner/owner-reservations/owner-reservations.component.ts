import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Reservation } from 'src/app/models/Reservation';

@Component({
  selector: 'app-owner-reservations',
  templateUrl: './owner-reservations.component.html',
  styleUrls: ['./owner-reservations.component.scss']
})
export class OwnerReservationsComponent implements OnInit {

  hours=["8 AM","9 AM","10 AM","11 AM","12 AM","13 PM","14 PM","15 PM","16 PM","17 PM","18 PM","19 PM","20 PM","21 PM","22 PM","23 PM"]
  weekDays=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
  reservation:Reservation[]=[]
  today=new Date
  days:Date[]=[]
  constructor(private http:HttpClient) { 
    
      this.today=new Date("2022-04-17T03:24:00")
      for (let i = 0; i < 7; i++) {
        this.days[i]=new Date()
        this.days[i].setDate(this.today.getDate()+i)
      }
    
  }
  
  ngOnInit(): void {
    this.http.get("http://localhost:8080/reservations").subscribe((res:any)=>{
      res.forEach((resp:any) => {
        this.reservation.push(new Reservation(resp.resId,resp.userId,new Date(resp.date)))
      });
    })
  }
  res:any
  getPosition(a:Reservation){
    let x=0;
    this.reservation.forEach(res => {
      if(res.date.toLocaleDateString()==a.date.toLocaleDateString()){
        if(res.date<a.date){
          x=x-120
        }
      }
    });
    return (x+a.date.getHours()*60+a.date.getMinutes())-480
  }
  back(){
    this .reservation=[]
    this.today.setDate(this.today.getDate()-7)
    let p=this.today.toLocaleDateString().split('/')
    let s=p[2]+'-'+p[1]+'-'+p[0]
    this.http.get("http://localhost:8080/reservations/"+s).subscribe((res:any)=>{
      res.forEach((resp:any) => {
        this.reservation.push(new Reservation(resp.resId,resp.userId,new Date(resp.date)))
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
    let s=p[2]+'-'+p[1]+'-'+p[0]
    this.http.get("http://localhost:8080/reservations/"+s).subscribe((res:any)=>{
      res.forEach((resp:any) => {
        this.reservation.push(new Reservation(resp.resId,resp.userId,new Date(resp.date)))
      });
    })
    let d=new Date(this.today)
    this.days=[]
    for (let i = 0; i < 7; i++) {
      this.days[i]=new Date(d)
      d.setDate(d.getDate()+1)
    }
  }
}