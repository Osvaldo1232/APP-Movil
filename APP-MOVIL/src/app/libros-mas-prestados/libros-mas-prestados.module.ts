import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LibrosMasPrestadosPageRoutingModule } from './libros-mas-prestados-routing.module';

import { LibrosMasPrestadosPage } from './libros-mas-prestados.page';
import { Loading } from '../shared/loading/loading';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Loading,
    LibrosMasPrestadosPageRoutingModule
  ],
  declarations: [LibrosMasPrestadosPage]
})
export class LibrosMasPrestadosPageModule {}
