import { NotaPedido } from '@core/interfaces/nota-pedido.interface';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-nota-detalle',
  templateUrl: './nota-detalle.component.html',
  styleUrls: ['./nota-detalle.component.scss']
})
export class NotaDetalleComponent implements OnChanges {

  @Input() notaPedido!: NotaPedido;

  constructor() {}
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.notaPedido.currentValue) {
      this.notaPedido = changes.notaPedido.currentValue;
    }
  }
  
}