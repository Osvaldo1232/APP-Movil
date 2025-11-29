import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrestamosVencidosPageRoutingModule } from './prestamos-vencidos-routing.module';

import { PrestamosVencidosPage } from './prestamos-vencidos.page';
import { Loading } from '../shared/loading/loading';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Loading,
    PrestamosVencidosPageRoutingModule
  ],
  declarations: [PrestamosVencidosPage]
})
export class PrestamosVencidosPageModule {}
