import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { WizardPageRoutingModule } from './wizard-routing.module';
import { WizardPage } from './wizard.page';

import { ParticalsModule } from '@theme/particals/particals.module';
import { ComponentsModule } from '@theme/components/components.module';
import { LayoutsModule } from '@theme/layouts/layouts.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WizardPageRoutingModule,
    ParticalsModule,
    ComponentsModule,
    LayoutsModule
  ],
  declarations: [WizardPage]
})
export class WizardPageModule {}
