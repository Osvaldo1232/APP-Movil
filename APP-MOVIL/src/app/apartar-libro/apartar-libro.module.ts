import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApartarLibroPageRoutingModule } from './apartar-libro-routing.module';

import { ApartarLibroPage } from './apartar-libro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApartarLibroPageRoutingModule
  ],
  declarations: [ApartarLibroPage]
})
export class ApartarLibroPageModule {}
