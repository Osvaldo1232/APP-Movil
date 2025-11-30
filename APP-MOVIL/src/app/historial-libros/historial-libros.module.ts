import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistorialLibrosPageRoutingModule } from './historial-libros-routing.module';

import { HistorialLibrosPage } from './historial-libros.page';
import { Loading } from '../shared/loading/loading';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Loading,
    HistorialLibrosPageRoutingModule
  ],
  declarations: [HistorialLibrosPage]
})
export class HistorialLibrosPageModule {}
