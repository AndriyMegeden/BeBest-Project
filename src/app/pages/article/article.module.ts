import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ArticlePageRoutingModule } from './article-routing.module';
import { ArticlePage } from './article.page';

import { ComponentsModule } from '@theme/components/components.module';
import { ParticalsModule } from '@theme/particals/particals.module';
import { LayoutsModule } from '@theme/layouts/layouts.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArticlePageRoutingModule,
    ComponentsModule,
    ParticalsModule,
    LayoutsModule,
  ],
  declarations: [ArticlePage]
})
export class ArticlePageModule {}
