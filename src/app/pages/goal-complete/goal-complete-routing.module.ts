import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GoalCompletePage } from './goal-complete.page';

const routes: Routes = [
  {
    path: '',
    component: GoalCompletePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GoalCompletePageRoutingModule {}
