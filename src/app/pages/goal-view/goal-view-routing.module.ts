import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GoalViewPage } from './goal-view.page';

const routes: Routes = [
  {
    path: '',
    component: GoalViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GoalViewPageRoutingModule {}
