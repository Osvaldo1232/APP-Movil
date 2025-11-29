import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LibrosMasPrestadosFechaPage } from './libros-mas-prestados-fecha.page';

const routes: Routes = [
  {
    path: '',
    component: LibrosMasPrestadosFechaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibrosMasPrestadosFechaPageRoutingModule {}
