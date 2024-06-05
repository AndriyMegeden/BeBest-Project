import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalendarTodayPage } from './calendar-today.page';

const routes: Routes = [
  {
    path: '',
    component: CalendarTodayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarTodayPageRoutingModule {}
