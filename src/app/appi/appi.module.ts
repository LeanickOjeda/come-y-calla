import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppiPageRoutingModule } from './appi-routing.module';

import { AppiPage } from './appi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppiPageRoutingModule
  ],
  declarations: [AppiPage]
})
export class AppiPageModule {}
