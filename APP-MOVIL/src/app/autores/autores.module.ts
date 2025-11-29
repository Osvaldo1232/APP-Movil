import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AutoresPageRoutingModule } from './autores-routing.module';

import { AutoresPage } from './autores.page';
import { Loading } from '../shared/loading/loading';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AutoresPageRoutingModule,
    Loading
  ],
  declarations: [AutoresPage]
})
export class AutoresPageModule {}
