import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SettingsProfilePageRoutingModule } from './settings-profile-routing.module';
import { SettingsProfilePage } from './settings-profile.page';
import { ComponentsModule } from '@theme/components/components.module';
import { ParticalsModule } from '@theme/particals/particals.module';
import { LayoutsModule } from '@theme/layouts/layouts.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingsProfilePageRoutingModule,
    ComponentsModule,
    ParticalsModule,
    LayoutsModule
  ],
  declarations: [SettingsProfilePage]
})
export class SettingsProfilePageModule {}
