import { SubSink } from 'subsink';
import { Color, Label } from 'ng2-charts';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { ChartService } from 'src/app/core/services/chart.service';
@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit, OnDestroy {

  public chartLegend = true;
  private subscriptions = new SubSink();
  public chartType: ChartType = 'bar';
  public chartData: ChartDataSets[] = [];
  public chartTitle = 'Ventas últimos 3 años ( en millones de COP )';

  public chartLabels: Label[] = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  public chartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public chartColors: Color[] = [
    { 
      // 2019: primary
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      borderColor: 'rgba(0, 113, 206, 0.5)',
      backgroundColor: 'rgba(0, 113, 206, 0.8)',
      pointBackgroundColor: 'rgba(0, 113, 206, 0.2)',
      pointHoverBorderColor: 'rgba(0, 113, 206, 0.8)'

    },
    { 
      // 2020: terceray
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      borderColor: 'rgba(251, 213, 0, 0.5)',
      backgroundColor: 'rgba(251, 213, 0, 0.5)',
      pointBackgroundColor: 'rgba(251, 213, 0, 0.2)',
      pointHoverBorderColor: 'rgba(251, 213, 0, 0.8)'
    },
    { 
      // 2021: secondary
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      borderColor: 'rgba(221, 0, 33, 0.5)',
      backgroundColor: 'rgba(221, 0, 33, 0.2)',
      pointBackgroundColor: 'rgba(221, 0, 33, 0.2)',
      pointHoverBorderColor: 'rgba(221, 0, 33, 0.8)'
    }
  ];
  
  constructor(
    private chartSvc: ChartService
  ) {}

  ngOnInit(): void {
    this._setChartData();
  }

  private _setChartData(): void {
    this.subscriptions.add(
      this.chartSvc.getBarChart()
        .subscribe({
          next: data => {
            this.chartData = data;
          },
          error: err => {
            console.log(err);
          }
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}