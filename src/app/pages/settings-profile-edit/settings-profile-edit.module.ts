import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SettingsProfileEditPageRoutingModule } from './settings-profile-edit-routing.module';
import { SettingsProfileEditPage } from './settings-profile-edit.page';

import { ComponentsModule } from '@theme/components/components.module';
import { ParticalsModule } from '@theme/particals/particals.module';
import { LayoutsModule } from '@theme/layouts/layouts.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingsProfileEditPageRoutingModule,
    ParticalsModule,
    ComponentsModule,
    LayoutsModule
  ],
  declarations: [SettingsProfileEditPage]
})
export class SettingsProfileEditPageModule {}
