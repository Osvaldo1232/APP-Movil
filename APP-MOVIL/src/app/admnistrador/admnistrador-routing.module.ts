import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdmnistradorPage } from './admnistrador.page';

const routes: Routes = [
  {
    path: '',
    component: AdmnistradorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdmnistradorPageRoutingModule {}
