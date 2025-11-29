import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdmnistradorPageRoutingModule } from './admnistrador-routing.module';

import { AdmnistradorPage } from './admnistrador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdmnistradorPageRoutingModule
  ],
  declarations: [AdmnistradorPage]
})
export class AdmnistradorPageModule {}
