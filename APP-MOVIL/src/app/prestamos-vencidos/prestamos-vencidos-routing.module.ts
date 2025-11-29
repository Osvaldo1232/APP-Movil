import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrestamosVencidosPage } from './prestamos-vencidos.page';

const routes: Routes = [
  {
    path: '',
    component: PrestamosVencidosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrestamosVencidosPageRoutingModule {}
