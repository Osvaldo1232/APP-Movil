import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LibrosMasPrestadosPage } from './libros-mas-prestados.page';

const routes: Routes = [
  {
    path: '',
    component: LibrosMasPrestadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibrosMasPrestadosPageRoutingModule {}
