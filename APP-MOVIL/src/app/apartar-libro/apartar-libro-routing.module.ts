import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApartarLibroPage } from './apartar-libro.page';

const routes: Routes = [
  {
    path: '',
    component: ApartarLibroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApartarLibroPageRoutingModule {}
