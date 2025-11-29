import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlumnosPageRoutingModule } from './alumnos-routing.module';

import { AlumnosPage } from './alumnos.page';
import { Loading } from '../shared/loading/loading';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Loading,
    AlumnosPageRoutingModule
  ],
  declarations: [AlumnosPage]
})
export class AlumnosPageModule {}
