import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LibrosVisualPage } from './libros-visual.page';

const routes: Routes = [
  {
    path: '',
    component: LibrosVisualPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibrosVisualPageRoutingModule {}
