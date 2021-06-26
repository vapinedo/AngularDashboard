import { SubSink } from 'subsink';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartService } from 'src/app/core/services/chart.service';

@Component({
  selector: 'app-progress-circle-2',
  templateUrl: './progress-circle-2.component.html',
  styleUrls: ['./progress-circle-2.component.scss']
})
export class ProgressCircle2Component implements OnInit, OnDestroy {

  public chartTitle = 'Metas alcanzadas ( este mes )';

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