import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsModule } from 'ng2-charts';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { HomeComponent } from './pages/home/home.component';
import { CardComponent } from './components/card/card.component';
import { HeaderComponent } from './components/header/header.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { FiltrosComponent } from './components/filtros/filtros.component';
import { BarChartComponent } from './components/charts/bar-chart/bar-chart.component';
import { PieChartComponent } from './components/charts/pie-chart/pie-chart.component';
import { RetractoComponent } from './components/novedades/retracto/retracto.component';
import { LineChartComponent } from './components/charts/line-chart/line-chart.component';
import { NovedadCreateComponent } from './pages/novedades/create/novedad-create.component';
import { NotaDetalleComponent } from './components/novedades/nota-detalle/nota-detalle.component';
import { ProgressCircleComponent } from './components/charts/progress-circle/progress-circle.component';
import { PieChart2Component } from './components/charts/progress-circle-2/pie-chart-2/pie-chart-2.component';
import { ProgressCircle2Component } from './components/charts/progress-circle-2/progress-circle-2.component';

const components = [
  HomeComponent,
  CardComponent,
  HeaderComponent,
  DialogComponent,
  FiltrosComponent,
  PieChartComponent,
  RetractoComponent,
  BarChartComponent,
  LineChartComponent,
  PieChart2Component,
  NotaDetalleComponent,
  NovedadCreateComponent,
  ProgressCircleComponent,
  ProgressCircle2Component
];

const entryComponents = [
  DialogComponent  
];

const modules = [
  CommonModule,
  ChartsModule,
  SharedModule,
  DashboardRoutingModule
];

@NgModule({
  declarations: [components],
  exports: [components],
  imports: [modules],
  entryComponents:[entryComponents] 
})
export class DashboardModule { }
