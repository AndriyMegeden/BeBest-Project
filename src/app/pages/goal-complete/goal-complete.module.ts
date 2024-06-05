import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { GoalCompletePageRoutingModule } from './goal-complete-routing.module';
import { GoalCompletePage } from './goal-complete.page';

import { ComponentsModule } from '@theme/components/components.module';
import { ParticalsModule } from '@theme/particals/particals.module';
import { LayoutsModule } from '@theme/layouts/layouts.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GoalCompletePageRoutingModule,
    ComponentsModule,
    ParticalsModule,
    LayoutsModule
  ],
  declarations: [GoalCompletePage]
})
export class GoalCompletePageModule {}
