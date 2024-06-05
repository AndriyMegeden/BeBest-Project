import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { AddGoalPageRoutingModule } from './add-goal-routing.module';

import { AddGoalPage } from './add-goal.page';
import { ComponentsModule } from '@theme/components/components.module';
import { ParticalsModule } from '@theme/particals/particals.module';
import { ModalsModule } from '@theme/modals/modals.module';
import { LayoutsModule } from '@theme/layouts/layouts.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddGoalPageRoutingModule,
    ParticalsModule,
    ComponentsModule,
    LayoutsModule,
    ModalsModule
  ],
  declarations: [AddGoalPage]
})
export class AddGoalPageModule {}
