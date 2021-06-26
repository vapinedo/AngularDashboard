import { Observable } from 'rxjs';
import { ChartDataSets } from 'chart.js';
import { Injectable } from '@angular/core';
@Injectable()
export class ChartService {

    private readonly TIEMPO_DE_REPUESTA = 1000;

    private lineChartData: ChartDataSets[] = [
        { data: [0, 20, 30, 40, 50, 60, 70, 80, 90, 100, 120, 130], label: 'Averías' },
        { data: [30, 30, 25, 20, 15, 10, 5, 0, 10, 15, 20, 25], label: 'Devoluciones' },
        { data: [10, 20, 30, 30, 25, 20, 15, 15, 20, 25, 30, 35], label: 'Retenciones' },
        { data: [0, 20, 30, 60, 50, 60, 50, 40, 50, 60, 60, 70], label: 'Recolecciones' },
        { data: [10, 20, 30, 40, 50, 60, 65, 60, 50, 40, 30, 20], label: 'Reprogramaciones' }
    ];

    private barChartData: ChartDataSets[] = [
        { data: [10, 20, 30, 20, 30, 30, 30, 40, 40, 50, 50, 70], label: '2019' },
        { data: [30, 30, 30, 40, 30, 50, 50, 20, 50, 40, 20, 80], label: '2020' },
        { data: [50, 50, 50, 70, 70, 70, 80, 70, 90, 80, 60, 150], label: '2021' },
    ];

    private pieChartData1: number[] = [40, 30, 20, 10, 10];
    private pieChartData2: number[] = [30, 20, 20, 15, 15];

    constructor() {}

    getLineChart(): Observable<any> {
        return new Observable(observer => {
            setTimeout(() => {
                observer.next(this.lineChartData);
                observer.complete();
            }, this.TIEMPO_DE_REPUESTA)
        });
    }

    getPieChart1(): Observable<any> {
        return new Observable(observer => {
            setTimeout(() => {
                observer.next(this.pieChartData1);
                observer.complete();
            }, this.TIEMPO_DE_REPUESTA)
        });
    }

    getPieChart2(): Observable<any> {
        return new Observable(observer => {
            setTimeout(() => {
                observer.next(this.pieChartData2);
                observer.complete();
            }, this.TIEMPO_DE_REPUESTA)
        });
    }

    getBarChart(): Observable<any> {
        return new Observable(observer => {
            setTimeout(() => {
                observer.next(this.barChartData);
                observer.complete();
            }, this.TIEMPO_DE_REPUESTA)
        });
    }
}