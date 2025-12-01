import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardempleadoPageRoutingModule } from './dashboardempleado-routing.module';

import { DashboardempleadoPage } from './dashboardempleado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardempleadoPageRoutingModule
  ],
  declarations: [DashboardempleadoPage]
})
export class DashboardempleadoPageModule {}
