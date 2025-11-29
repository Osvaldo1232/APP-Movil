import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LibrosMasPrestadosFechaPageRoutingModule } from './libros-mas-prestados-fecha-routing.module';

import { LibrosMasPrestadosFechaPage } from './libros-mas-prestados-fecha.page';
import { Loading } from '../shared/loading/loading';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Loading,
    IonicModule,
    LibrosMasPrestadosFechaPageRoutingModule
  ],
  declarations: [LibrosMasPrestadosFechaPage]
})
export class LibrosMasPrestadosFechaPageModule {}
