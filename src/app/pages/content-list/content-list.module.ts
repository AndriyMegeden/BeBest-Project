import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ContentListPageRoutingModule } from './content-list-routing.module';

import { ContentListPage } from './content-list.page';
import { ComponentsModule } from '@theme/components/components.module';
import { ParticalsModule } from '@theme/particals/particals.module';
import { LayoutsModule } from '@theme/layouts/layouts.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContentListPageRoutingModule,
    ComponentsModule,
    ParticalsModule,
    LayoutsModule
  ],
  declarations: [ContentListPage]
})
export class ContentListPageModule {}
