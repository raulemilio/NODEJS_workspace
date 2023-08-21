import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogPageRoutingModule } from './log-routing.module';

import { LogPage } from './log.page';
import { EstadoElectrovalvulaPipe } from './estado-electrovalvula.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogPageRoutingModule
  ],
  declarations: [LogPage, EstadoElectrovalvulaPipe]
})
export class LogPageModule {}
