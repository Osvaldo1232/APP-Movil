import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LibrosVisualPageRoutingModule } from './libros-visual-routing.module';

import { LibrosVisualPage } from './libros-visual.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LibrosVisualPageRoutingModule
  ],
  declarations: [LibrosVisualPage]
})
export class LibrosVisualPageModule {}
