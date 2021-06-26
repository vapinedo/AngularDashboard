import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomPaginator } from './servicios/util/custom-paginator';

import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { CompartirModule } from './componentes/compartir.module';

import { AppComponent } from './app.component';
import { LayoutComponent } from './feature/layout.component';
@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CompartirModule,
    CoreModule
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useClass: CustomPaginator
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
