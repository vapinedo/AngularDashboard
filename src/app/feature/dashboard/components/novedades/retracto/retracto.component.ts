import { SubSink } from 'subsink';
import { MatSort } from '@angular/material/sort';
import { Sku } from '@core/interfaces/sku.interface';
import { MatSelectChange } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { MessageService } from '@core/services/message.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NovedadesService } from '@core/services/novedades.service';
import { NotaPedido } from '@core/interfaces/nota-pedido.interface';
import { DataDummyService } from '@core/services/data-dummy.service';
import { ValidatorsService } from '@core/services/validators.service';
import { GenerateXmlService } from '@core/services/generate-xml.service';
import { RetractoCrear } from '@core/interfaces/retracto-crear.interface';
import { NotaDevolucionService } from '@core/services/nota-devolucion.service';
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-retracto',
  templateUrl: './retracto.component.html',
  styleUrls: ['./retracto.component.scss']
})
export class RetractoComponent implements OnChanges, OnInit, OnDestroy {

  @Input() notaPedido!: NotaPedido;
  @ViewChild(MatSort) sort!: MatSort;

  public showSpinner = false;
  private readonly idRetracto = 2;

  public usuarioLogueado: string | null;
  public userEmail: any[] = [{ key: 'Otro', value: 1 }];
  public userPhone: any[] = [{ key: 'Otro', value: 1 }];
  public emailSeleccionado: string = '';
  public phoneSeleccionado: string = '';

  public form!: FormGroup;
  public listadoDeSkus: any[] = [];
  private subscriptions = new SubSink();
  public dataSource = new MatTableDataSource();
  public displayedColumns: string[] = ['sku', 'descripcion', 'cantidad', 
    'cantidadDevolucion', 'motivoDevolucion'];

  public mediosDevolucion: any[] = [];
  public motivosDevolucion: any[] = [];
  public tipoDevolucionSeleccionada: string = '';
  public opcionesDevolucion: Array<any> = [
    { KEY: 'Refacturar', VALUE: 1 },
    { KEY: 'Devolver valor pagado a cliente', VALUE: 2 }
  ];

  constructor(
    private fb: FormBuilder,
    private messageSvc: MessageService,
    private dataDummySvc: DataDummyService,
    private novedadesSvc: NovedadesService,
    private validatorsSvc: ValidatorsService,
    private generateXmlSvc: GenerateXmlService,
    private notaDevolucionSvc: NotaDevolucionService,
  ) {
    this.usuarioLogueado = sessionStorage.getItem("usuario");
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.notaPedido.currentValue) {
      this.notaPedido = changes.notaPedido.currentValue;

      if (this.notaPedido.STICKER) {
        this._setDatasource(this.notaPedido.STICKER);
        this._setMediosDevolucion(this.notaPedido.STICKER);
      }
    }
  }

  ngOnInit(): void {
    this._setMotivosDevolucion();
  }

  onDevolucionAcordadaChange(event: MatSelectChange): void {
    const devolucionSeleccionada = event.value;
    switch(devolucionSeleccionada) {
      case 'Refacturar': 
        this.tipoDevolucionSeleccionada = 'refacturar';
        this.form.controls.infoGeneral.get('medioDevolucion')?.clearValidators();
        this.form.controls.infoGeneral.get('medioDevolucion')?.updateValueAndValidity();
      break;
          
      case 'Devolver valor pagado a cliente':
        this.tipoDevolucionSeleccionada = 'devolverValorPagado';
        this.form.controls.infoGeneral.get('medioDevolucion')?.setValidators(Validators.required);
        this.form.controls.infoGeneral.get('medioDevolucion')?.updateValueAndValidity();
      break;
    }
  }

  onEmailChange(event: MatSelectChange): void {
    const idEmailSeleccionado = event.value;
    switch(idEmailSeleccionado) {
      case 0: // Email del usuario logueado
        this.emailSeleccionado = 'actual';
        this.form.controls.infoGeneral.get('nuevoEmail')?.clearValidators();
        this.form.controls.infoGeneral.get('nuevoEmail')?.updateValueAndValidity();
      break;
          
      case 1: // Email telefono a ingresar
        this.emailSeleccionado = 'nuevo';
        this.form.controls.infoGeneral.get('nuevoEmail')?.setValidators([
          Validators.required,
          Validators.pattern(this.validatorsSvc.VALID_EMAIL_STRING)
        ]);
        this.form.controls.infoGeneral.get('nuevoEmail')?.updateValueAndValidity();
      break;
    }
  }

  onPhoneChange(event: MatSelectChange): void {
    const idPhoneSeleccionado = event.value;
    switch(idPhoneSeleccionado) {
      case 0: // Telefono del usuario logueado
        this.phoneSeleccionado = 'actual';
        this.form.controls.infoGeneral.get('nuevoTelefono')?.clearValidators();
        this.form.controls.infoGeneral.get('nuevoTelefono')?.updateValueAndValidity();
      break;
          
      case 1: // Nuevo telefono a ingresar
        this.phoneSeleccionado = 'nuevo';
        this.form.controls.infoGeneral.get('nuevoTelefono')?.setValidators(Validators.required);
        this.form.controls.infoGeneral.get('nuevoTelefono')?.updateValueAndValidity();
      break;
    }
  }

  private _setMediosDevolucion(sticker: string): void {
    this.subscriptions.add(
      this.notaDevolucionSvc.getMediosDevolucion(sticker)
        .subscribe({
          next: data => {
            this.mediosDevolucion = data;
          }
        })
    );
  }
  
  private _setMotivosDevolucion(): void {
    this.subscriptions.add(
      this.notaDevolucionSvc.getMotivosDevolucion()
        .subscribe({
          next: data => {
            this.motivosDevolucion = data;
          }
        })
    );
  }
  
  private _setDatasource(sticker: string): void {
    this.subscriptions.add(
      this.novedadesSvc.getSkusBySticker(sticker)
        .subscribe({
          next: data => {
            this.listadoDeSkus = data;
            this.dataSource.data = data;
            this.dataSource.sort = this.sort;

            this._setForm(this.listadoDeSkus);
            this._setUser(sticker);
          }
        })
    );
  }
  
  private _setUser(sticker: string): void {
    this.subscriptions.add(
      this.novedadesSvc.getUsuarioNotaPedidoBySticker(sticker)
        .subscribe({
          next: data => {
            if (data) {
              this.userEmail.unshift({ key: data[0].EMAIL, value: 0 })
              this.userPhone.unshift({ key: data[0].TELEFONO, value: 0 })
            }
          }
        })
    );
  }

  private _setForm(listadoDeSkus: Sku[]) {
    this.form = this.fb.group({
      infoGeneral: this.fb.group({
        buscarNP: [null],
        notaPedido: [null],
        nuevoEmail: [null],
        nuevoTelefono: [null],
        medioDevolucion: [null],
        email: [null, Validators.required],
        telefono: [null, Validators.required],
        devolucionAcordada: [null, Validators.required],
        usuarioQuienDevuelve: [this.usuarioLogueado, Validators.required],
      }),
      skus: this.fb.array(this._setSkus(listadoDeSkus))
    });
  }

  private _setSkus(listadoDeSkus: any[]): FormGroup[] {
    const skus: FormGroup[] = [];
    for(let i=0; i<listadoDeSkus.length; i++) {
      skus.push(
        this.fb.group({
          motivoDevolucion: [null],
          cantidadDevolver: [null],
          sku: [listadoDeSkus[i].SKU],
          descripcion: [listadoDeSkus[i].DESCRIPCION],
          cantidadActual: [listadoDeSkus[i].CANTIDAD_NP]
        })
      );
    }
    return skus;
  }

  onSubmit(): void {
    if (this.form.valid && this.notaPedido.STICKER) {
      this.showSpinner = true;
      const retracto = this._prepareDataBeforeSend(this.form.value);

      if (retracto) {
        this.subscriptions.add(
          this.novedadesSvc.createRetracto(retracto)
            .subscribe({
              next: data => {
                const idRrespuesta = data[0].ID;
                const mensajeRespuesta = data[0].MENSAJE;
  
                if (idRrespuesta >= 1) {
                  this.messageSvc.success();
                } else if (idRrespuesta === 0) {
                  this.messageSvc.error(mensajeRespuesta);
                } else {
                  this.messageSvc.error('Error al crear registro');
                }
              },
              complete: () => this.showSpinner = false
            })
        );
      } else {
        return;
      }
    }
    return;
  }

  private _prepareDataBeforeSend(data: any): RetractoCrear | null{
    const arregloDeSkus = data.skus;
    const nombreParaElXml = 'novedades';
    const infoGeneral = data.infoGeneral;
    const skusFiltrados = arregloDeSkus.filter((sku: Sku) => sku.motivoDevolucion && sku.cantidadDevolver);
    const xmlFile = this.generateXmlSvc.jsonToXml(nombreParaElXml, skusFiltrados);

    if (this.notaPedido.STICKER) {
      const retracto: RetractoCrear = {
        xml: xmlFile,
        infoGeneral: {
          medioDevolucion: infoGeneral.medioDevolucion,
          devolucionAcordada: infoGeneral.devolucionAcordada, 
          usuarioQuienDevuelve: infoGeneral.usuarioQuienDevuelve,
          email: infoGeneral.nuevoEmail ? infoGeneral.nuevoEmail: this.userEmail[0].key,
          telefono: infoGeneral.nuevoTelefono ? infoGeneral.nuevoTelefono: this.userPhone[0].key,
        },
        idTipoNovedad: this.idRetracto,
        sticker: this.notaPedido.STICKER
      };
      return retracto;
    }
    return null;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  
}