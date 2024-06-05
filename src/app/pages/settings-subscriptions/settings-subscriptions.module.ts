import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SettingsSubscriptionsPageRoutingModule } from './settings-subscriptions-routing.module';
import { SettingsSubscriptionsPage } from './settings-subscriptions.page';
import { ComponentsModule } from '@theme/components/components.module';
import { ParticalsModule } from '@theme/particals/particals.module';
import { LayoutsModule } from '@theme/layouts/layouts.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingsSubscriptionsPageRoutingModule,
    ParticalsModule,
    LayoutsModule,
    ComponentsModule
  ],
  declarations: [SettingsSubscriptionsPage]
})
export class SettingsSubscriptionsPageModule {}
