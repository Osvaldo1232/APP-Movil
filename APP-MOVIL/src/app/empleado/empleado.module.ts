import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmpleadoPageRoutingModule } from './empleado-routing.module';

import { EmpleadoPage } from './empleado.page';
import { Loading } from '../shared/loading/loading';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
        Loading,
    
    IonicModule,
    EmpleadoPageRoutingModule
  ],
  declarations: [EmpleadoPage]
})
export class EmpleadoPageModule {}
