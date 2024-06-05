import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SettingsLanguagePageRoutingModule } from './settings-language-routing.module';
import { SettingsLanguagePage } from './settings-language.page';
import { ComponentsModule } from '@theme/components/components.module';
import { ParticalsModule } from '@theme/particals/particals.module';
import { LayoutsModule } from '@theme/layouts/layouts.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingsLanguagePageRoutingModule,
    ParticalsModule,
    LayoutsModule,
    ComponentsModule
  ],
  declarations: [SettingsLanguagePage]
})
export class SettingsLanguagePageModule {}
