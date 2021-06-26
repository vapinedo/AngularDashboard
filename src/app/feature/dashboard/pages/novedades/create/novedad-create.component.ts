import { SubSink } from 'subsink'; 
import { Location } from '@angular/common/';
import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { MessageService } from 'src/app/core/services/message.service';
import { NotaPedido } from 'src/app/core/interfaces/nota-pedido.interface';
import { NovedadesService } from 'src/app/core/services/novedades.service';
import { NotaPedidoService } from 'src/app/core/services/nota-pedido.service';
import { NovedadCrear } from 'src/app/core/interfaces/novedad-crear.interface';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-novedad-create',
  templateUrl: './novedad-create.component.html',
  styleUrls: ['./novedad-create.component.scss']
})
export class NovedadCreateComponent implements OnInit {

  public iconSpin = false;
  public showSpinner = false;
  public tiposNovedad: any[] = [];

  public busquedaNotaInit = false;

  public causalesReprogramacion: any;
  public secionTitle = 'Crear novedad';
  public novedadSeleccionada: string = '';

  /* 
    Bandera booleana que indica si
    la nota pedido ya está entregada y completada
    con lo cual no se podrá crear una nueva novedad 
  */
  public notaCerradaYCompletada = false;

  public form: FormGroup;
  public notaPedido!: NotaPedido;
  public buscarNota = new FormControl();
  private subscriptions = new SubSink();

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private messageSvc: MessageService,
    private novedadesSvc: NovedadesService,
    private notaPedidoSvc: NotaPedidoService
  ) {
    this.form = this.fb.group({
      idCausal: [''],
      idNovedad: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this._setCausales();
  }

  private _setCausales(): void {
    this.subscriptions.add(
      this.novedadesSvc.getCausales()
        .subscribe({
          next: data => {
            this.causalesReprogramacion = data;
          },
          error: err => this.messageSvc.error(err)
        })
    );
  }
  
  private _setTipoNovedades(): void {
    if (this.notaPedido.ID_ESTADO_SAPS) {
      const IDEstadoNP = this.notaPedido.ID_ESTADO_SAPS;

      this.subscriptions.add(
        this.novedadesSvc.getTodas(IDEstadoNP)
          .subscribe({
            next: data => {
              this.tiposNovedad = data;
            },
            error: err => console.log(err)
          })
      );
    }
  }

  onTipoNovedadChange(event: MatSelectChange): void {
    const idNovedadSeleccionado = event.value;
    switch(idNovedadSeleccionado) {
      case 1: // Reprogramacion
        this._setCausalReprogramacionRequired();
        this.novedadSeleccionada = 'reprogramacion';
      break;
      
      case 2: // Retracto
        this.novedadSeleccionada = 'retracto';
      break;
        
      default:
        this.novedadSeleccionada = '';
        this.form.controls.idCausal.clearValidators();
      break;
    }
  }

  private _setCausalReprogramacionRequired(): void {
    this.form.controls.idCausal.reset();
    this.form.controls.idCausal.setValidators([Validators.required]);
    this.form.controls.idCausal.updateValueAndValidity();
  }  

  onSearchNota(notaPedido: string): void {
    if(notaPedido.length > 0) {
      this.notaPedido = {};
      this.iconSpin = true;
      //this.isNotaComplete = false;
      this.busquedaNotaInit = true;
      this.notaCerradaYCompletada = false;

      this.subscriptions.add(
        this.notaPedidoSvc.getByNP(notaPedido)
          .subscribe({
            next: data => {
              if(data) { 
                this.notaPedido = data[0]; 
                this._setTipoNovedades();

                if(this.notaPedido.ID_ESTADO_SAPS) {
                  const estado = this.notaPedido.ID_ESTADO_SAPS;
                  this.notaCerradaYCompletada = this.verificarEstadoNota(estado);
                }
              }
              else { 
                this.notaCerradaYCompletada = false;
                this.messageSvc.error('Error al cargar Nota Pedido'); 
              }
            },
            error: err => {
              this.iconSpin = false;
              this.messageSvc.error(err);
            },
            complete: () => {
              this.form.reset();
              this.iconSpin = false;
            }
          })
      );
    }
  }

  private verificarEstadoNota(estadoNota: number): boolean {
    return this.notaPedidoSvc.checkNotaPedidoIsComplete(estadoNota);
  }

  onSubmit(): void {
    if(this.form.valid) {
      this.showSpinner = true;
      const nuevaNovedad: NovedadCrear = this._prepareDataBeforeSend(this.form.value);
      
      this.subscriptions.add(
        this.novedadesSvc.createReprogramacion(nuevaNovedad)
          .subscribe({
            next: data => {
              if (data[0].CODIGO > 0) {
                this.messageSvc.success();
              } else {
                this.messageSvc.error(data);
              }
            },
            error: err => {
                this.showSpinner = false;     
                this.messageSvc.error(err);
              },
            complete: () => this.showSpinner = false
          })
      );
    }
    return;
  }

  private _prepareDataBeforeSend(data: any): NovedadCrear {
    let nuevaNovedad: NovedadCrear = {}; 
    nuevaNovedad.idCausal = data.idCausal;
    nuevaNovedad.idNovedad = data.idNovedad;
    nuevaNovedad.sticker = this.notaPedido.STICKER;
    nuevaNovedad.nombreUsuario = sessionStorage.getItem("usuario");
    return nuevaNovedad;
  }

  private _disabledForm(): void {
    this.buscarNota.disable();
    this.form.controls.tipoNovedad.disable();
    this.form.controls.causalReprogramacion.disable();
  }

  onGoBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}