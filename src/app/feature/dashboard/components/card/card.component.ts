import { SubSink } from 'subsink';
import { Component, OnDestroy } from '@angular/core';
import { Novedad } from 'src/app/core/interfaces/novedad.interface';
import { MessageService } from 'src/app/core/services/message.service';
import { NovedadesService } from 'src/app/core/services/novedades.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnDestroy {

  public showSpinner: boolean;
  public dataSource: Novedad[] = [];
  private subscriptions = new SubSink();

  constructor(
    private messageSvc: MessageService,
    private novedadesSvc: NovedadesService
  ) {
    this.showSpinner = true;
    this._setDataSource();

    this.subscriptions.add(
      this.novedadesSvc.onNovedadesChange
        .subscribe(data => this.dataSource = data)
    );
  }
  
  private _setDataSource(): void {
    this.subscriptions.add(
      this.novedadesSvc.getAll()
        .subscribe({
          next: data => {
            this.dataSource = data;
            this.showSpinner = false;
          },
          error: err => {
            this.messageSvc.error(err);
            this.showSpinner = false;
          },
          complete: () => {
            this.showSpinner = false;
          }
        })
    );
  }

  onRedirect(path: any): void {
    window.location.href = path;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}