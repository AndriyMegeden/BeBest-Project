import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { GoalsListPageRoutingModule } from './goals-list-routing.module';
import { GoalsListPage } from './goals-list.page';

import { ComponentsModule } from '@theme/components/components.module';
import { ParticalsModule } from '@theme/particals/particals.module';
import { LayoutsModule } from '@theme/layouts/layouts.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GoalsListPageRoutingModule,
    ComponentsModule,
    ParticalsModule,
    LayoutsModule
  ],
  declarations: [GoalsListPage]
})
export class GoalsListPageModule {}
