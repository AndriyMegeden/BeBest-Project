import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsLanguagePage } from './settings-language.page';

const routes: Routes = [
  {
    path: '',
    component: SettingsLanguagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsLanguagePageRoutingModule {}
