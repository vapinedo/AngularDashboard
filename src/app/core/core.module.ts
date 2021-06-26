import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorHttpService } from '../servicios/interceptor-http/interceptor-http.service';

import { ChartService } from './services/chart.service';
import { FiltrosService } from './services/filtros.service';
import { MessageService } from './services/message.service';
import { DatetimeService } from './services/datetime.service';
import { NovedadesService } from './services/novedades.service';
import { DataDummyService } from './services/data-dummy.service';
import { ValidatorsService } from './services/validators.service';
import { NotaPedidoService } from './services/nota-pedido.service';
import { GenerateXmlService } from './services/generate-xml.service';
import { NotaDevolucionService } from './services/nota-devolucion.service';
@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    ChartService,
    FiltrosService,
    MessageService,
    DatetimeService,
    NovedadesService,
    DataDummyService,
    NotaPedidoService,
    ValidatorsService,
    GenerateXmlService,
    NotaDevolucionService,
    {
      multi: true,
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorHttpService
    }
  ]
})
export class CoreModule { }
