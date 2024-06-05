import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GoalsListPage } from './goals-list.page';

const routes: Routes = [
  {
    path: '',
    component: GoalsListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GoalsListPageRoutingModule {}
