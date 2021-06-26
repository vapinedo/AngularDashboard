import { SubSink } from 'subsink';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartService } from 'src/app/core/services/chart.service';

@Component({
  selector: 'app-progress-line',
  templateUrl: './progress-line.component.html',
  styleUrls: ['./progress-line.component.scss']
})
export class ProgressLineComponent implements OnInit, OnDestroy {

  public chartTitle = 'Recolecciones';

  constructor(
    private chartSvc: ChartService
  ) {}

  ngOnInit(): void {
    // this._setChartData();
  }

  // private _setChartData(): void {
  //   this.subscriptions.add(
  //     this.chartSvc.getPieChart()
  //       .subscribe({
  //         next: data => {
  //           this.chartData = data;
  //         },
  //         error: err => {
  //           console.log(err);
  //         },
  //         complete: () => {
  //           console.log('Complete');
  //         }
  //       })
  //   );
  // }

  ngOnDestroy(): void {
    // this.subscriptions.unsubscribe();
  }

}