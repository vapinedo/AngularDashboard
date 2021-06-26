import { SubSink } from 'subsink';
import { Label } from 'ng2-charts';
import { ChartOptions, ChartType } from 'chart.js';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartService } from 'src/app/core/services/chart.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit, OnDestroy {

  public chartLegend = true;
  public chartData: number[] = [];
  public chartType: ChartType = 'pie';
  private subscriptions = new SubSink();
  public chartTitle = 'Novedades ( este año )';

  public chartLabels: Label[] = ['Averías', 'Devoluciones', 'Retenciones', 'Recolecciones', 'Reprogramaciones'];
  public chartColors = [{ backgroundColor: ['#56af31', '#0071ce', '#9ea1a9', '#dd0021', '#707070'],},];

  public chartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'left',
    },
    plugins: {
      datalabels: {
        formatter: (value: any, ctx: any) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  
  constructor(
    private chartSvc: ChartService
  ) {}

  ngOnInit(): void {
    this._setChartData();
  }

  private _setChartData(): void {
    this.subscriptions.add(
      this.chartSvc.getPieChart1()
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