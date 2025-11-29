import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistorialLibrosPage } from './historial-libros.page';

const routes: Routes = [
  {
    path: '',
    component: HistorialLibrosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistorialLibrosPageRoutingModule {}
