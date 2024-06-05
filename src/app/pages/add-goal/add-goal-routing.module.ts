import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddGoalPage } from './add-goal.page';

const routes: Routes = [
  {
    path: '',
    component: AddGoalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddGoalPageRoutingModule {}
