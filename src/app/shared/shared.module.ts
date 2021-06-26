import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../componentes/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SpinnerComponent } from './components/loaders/spinner.component';
import { ProgressbarComponent } from './components/loaders/progressbar.component';
import { FacebookLoaderComponent } from './components/loaders/facebook-loader.component';

const modules = [
  FormsModule,
  RouterModule,
  ToastrModule,
  CommonModule,
  MaterialModule,
  ReactiveFormsModule,
  ToastrModule.forRoot({
    maxOpened: 3,
    timeOut: 5000,
    autoDismiss: true,
    preventDuplicates: true,
    positionClass: 'toast-top-right'
  })
];

const components = [
  SidebarComponent,
  SpinnerComponent,
  ProgressbarComponent,
  FacebookLoaderComponent
];

@NgModule({
  declarations: [components],
  imports: [modules],
  exports: [components, modules]
})
export class SharedModule { }