import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentListPage } from './content-list.page';

const routes: Routes = [
  {
    path: '',
    component: ContentListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentListPageRoutingModule {}
