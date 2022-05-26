import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})

export class AdminDashboardComponent implements OnInit {

  constructor(private elRef:ElementRef) {}
  chart: any;
  ngOnInit(): void {
    this.chart = new Chart('areaChart', {
      type: 'line',
      data: this.data
    });
    this.chart = new Chart('areaChart2', {
      type: 'doughnut',
      data: {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [
          {
            label: 'My First Dataset',
            data: [300, 50, 100],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
            ],
            hoverOffset: 10,
          },
        ],
      }
    });
  }
  
  data = {
    labels: [
      'Janvier',
      'Février',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juillet',
      'Aout',
      'Septembre',
      'Octobre',
      'Novembre',
      'Décembre'
    ],
    datasets: [
      {
        label: 'Reservations',
        data: [0, 0, 0, 0, 0, 5, 15, 2,0,0,0,0],
        backgroundColor: 'rgba(40,125,200,.5)',
        borderColor: 'rgb(40,100,200)',
        fill: true,
        lineTension: 0.4,
        radius: 5,
      },
    ],
  };
  
}
