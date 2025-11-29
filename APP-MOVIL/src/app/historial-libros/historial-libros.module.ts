import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistorialLibrosPageRoutingModule } from './historial-libros-routing.module';

import { HistorialLibrosPage } from './historial-libros.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistorialLibrosPageRoutingModule
  ],
  declarations: [HistorialLibrosPage]
})
export class HistorialLibrosPageModule {}
