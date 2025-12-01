import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardempleadoPage } from './dashboardempleado.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardempleadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardempleadoPageRoutingModule {}
