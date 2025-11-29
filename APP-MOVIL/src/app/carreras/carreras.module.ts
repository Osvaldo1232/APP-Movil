import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarrerasPageRoutingModule } from './carreras-routing.module';

import { CarrerasPage } from './carreras.page';
import { Loading } from '../shared/loading/loading';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarrerasPageRoutingModule,
    Loading
  ],
  declarations: [CarrerasPage]
})
export class CarrerasPageModule {}
