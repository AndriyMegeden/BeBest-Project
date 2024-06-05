import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsSubscriptionsPage } from './settings-subscriptions.page';

const routes: Routes = [
  {
    path: '',
    component: SettingsSubscriptionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsSubscriptionsPageRoutingModule {}
