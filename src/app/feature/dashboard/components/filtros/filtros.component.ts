import { SubSink } from 'subsink';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Tienda } from 'src/app/core/interfaces/tienda.interface';
import { MessageService } from 'src/app/core/services/message.service';
import { FiltrosService } from 'src/app/core/services/filtros.service';
import { DatetimeService } from 'src/app/core/services/datetime.service';
import { NovedadesService } from 'src/app/core/services/novedades.service';
import { FiltroNovedad } from 'src/app/core/interfaces/filtro-novedad.interface';
import { NovedadEstado } from 'src/app/core/interfaces/novedad-estado.interface';
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.scss']
})
export class FiltrosComponent implements OnInit, OnDestroy {
  
  private subscriptions = new SubSink();

  public form: FormGroup;
  public tiendas: Tienda[] = [];
  public estados: NovedadEstado[] = [];
  
  @Output() onFilterChange = new EventEmitter;
  
  constructor(
    private fb: FormBuilder,
    private filtrosSvc: FiltrosService,
    private messageSvc: MessageService,
    private dateTimeSvc: DatetimeService,
    private novedadesSvc: NovedadesService,

  ) { 
    this._setTiendas();
    this._setEstados();

    this.form = this.fb.group({
      tienda: [''],
      estado: [''],
      fechaFin: [''],
      fechaInicio: ['']
    });
  } 

  ngOnInit(): void {
    this._setTiendas();
    this._setEstados();
  }
  
  private _setTiendas(): void {
    this.subscriptions.add(
      this.filtrosSvc.getTiendas()
        .subscribe({
          next: data => {
            this.tiendas = data;
          },
          error: err => this.messageSvc.error(err)
        })
    );
  }

  private _setEstados(): void {
    this.subscriptions.add(
      this.novedadesSvc.getEstados()
        .subscribe({
          next: data => {
            this.estados = data;
          },
          error: err => this.messageSvc.error(err)
        })
    );
  }

  onSubmit(): void {
    if(this.form.valid){
      const preparedData = this._prepareDataBeforeSend(this.form.value);
      this.subscriptions.add(
        this.novedadesSvc.getByFilter(preparedData).subscribe()
      );
    }
    return;
  }
  
  private _prepareDataBeforeSend(data: any): FiltroNovedad {
    const preparedData: FiltroNovedad = {};
    preparedData.tienda = data.tienda;
    preparedData.estado = data.estado;
    if (data.fechaFin?._d) {
      preparedData.fechaFin = this.dateTimeSvc.dateToDayMonthYearh(data.fechaFin._d);
    } 
    if (data.fechaInicio?._d) {
      preparedData.fechaInicio = this.dateTimeSvc.dateToDayMonthYearh(data.fechaInicio._d);
    }
    return preparedData;
  }

  onFormReset(): void {
    this.form.reset();
    this.subscriptions.add(
      this.novedadesSvc.getAll().subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  
}