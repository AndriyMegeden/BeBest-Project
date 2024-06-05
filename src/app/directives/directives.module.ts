import { NgModule } from '@angular/core';
import { PhoneMaskDirective } from './phone-mask.directive';
import { ClickVibrateDirective } from './click-vibrate.directive';

@NgModule({
  imports: [],
  declarations: [
    PhoneMaskDirective,
    ClickVibrateDirective
  ],
  exports: [
    PhoneMaskDirective,
    ClickVibrateDirective
  ]
})
export class DirectivesModule { };
