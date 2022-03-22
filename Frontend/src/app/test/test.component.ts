import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor(private auth:AuthentificationService) { }
  data:any=[]
  private _todos: BehaviorSubject<[]> = new BehaviorSubject([]);
  ngOnInit(): void {
  }
}
