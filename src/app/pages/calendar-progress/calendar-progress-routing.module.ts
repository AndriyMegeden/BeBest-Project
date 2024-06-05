import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarProgressPage } from './calendar-progress.page';


const routes: Routes = [
  {
    path: '',
    component: CalendarProgressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarProgressPageRoutingModule {}
