import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GoalsTodayPage } from './goals-today.page';

const routes: Routes = [
  {
    path: '',
    component: GoalsTodayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GoalsTodayPageRoutingModule {}
