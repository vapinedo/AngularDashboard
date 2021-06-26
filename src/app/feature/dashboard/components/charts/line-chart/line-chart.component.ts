import { SubSink } from 'subsink';
import { Color, Label } from 'ng2-charts';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { ChartService } from 'src/app/core/services/chart.service';
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit, OnDestroy {

  public chartLegend = true;
  private subscriptions = new SubSink();
  public chartType: ChartType = 'line';
  public chartData: ChartDataSets[] = [];
  public chartTitle = 'Comparativa novedades 2020';

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
      // Averias: primary
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      borderColor: 'rgba(0, 113, 206, 0.5)',
      backgroundColor: 'rgba(0, 113, 206, 0.2)',
      pointBackgroundColor: 'rgba(0, 113, 206, 0.2)',
      pointHoverBorderColor: 'rgba(0, 113, 206, 0.8)'

    },
    { 
      // Devoluciones: grey-dark
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      borderColor: 'rgba(94, 92, 92, 0.5)',
      backgroundColor: 'rgba(94, 92, 92, 0.2)',
      pointBackgroundColor: 'rgba(94, 92, 92, 0.2)',
      pointHoverBorderColor: 'rgba(94, 92, 92, 0.8)'
    },
    { 
      // Retenciones: success
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      borderColor: 'rgba(86, 175, 49, 0.5)',
      backgroundColor: 'rgba(86, 175, 49, 0.2)',
      pointBackgroundColor: 'rgba(86, 175, 49, 0.2)',
      pointHoverBorderColor: 'rgba(86, 175, 49, 0.8)'
    },
    { 
      // Recolecciones: terceray
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      borderColor: 'rgba(251, 213, 0, 0.5)',
      backgroundColor: 'rgba(251, 213, 0, 0.2)',
      pointBackgroundColor: 'rgba(251, 213, 0, 0.2)',
      pointHoverBorderColor: 'rgba(251, 213, 0, 0.8)'
    },
    { 
      // Reprogramaciones: secondary
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
      this.chartSvc.getLineChart()
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