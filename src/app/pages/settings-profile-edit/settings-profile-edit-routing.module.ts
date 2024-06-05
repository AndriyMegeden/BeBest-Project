import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsProfileEditPage } from './settings-profile-edit.page';

const routes: Routes = [
  {
    path: '',
    component: SettingsProfileEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsProfileEditPageRoutingModule {}
