import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrestamosPageRoutingModule } from './prestamos-routing.module';

import { PrestamosPage } from './prestamos.page';
import { Loading } from '../shared/loading/loading';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Loading,
    IonicModule,
    PrestamosPageRoutingModule
  ],
  declarations: [PrestamosPage]
})
export class PrestamosPageModule {}
