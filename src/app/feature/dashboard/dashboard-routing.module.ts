import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { NovedadCreateComponent } from './pages/novedades/create/novedad-create.component';

const routes: Routes = [
  // { path: '', component: HomeComponent },
  // { path: 'crear-novedad', component: NovedadCreateComponent },
  { path: '', component: NovedadCreateComponent },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }