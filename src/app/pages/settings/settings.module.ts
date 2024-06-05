import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SettingsPageRoutingModule } from './settings-routing.module';
import { SettingsPage } from './settings.page';

import { ComponentsModule } from '@theme/components/components.module';
import { ParticalsModule } from '@theme/particals/particals.module';
import { LayoutsModule } from '@theme/layouts/layouts.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingsPageRoutingModule,
    ComponentsModule,
    ParticalsModule,
    LayoutsModule
  ],
  declarations: [SettingsPage]
})
export class SettingsPageModule {}
