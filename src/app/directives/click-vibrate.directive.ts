import { Directive, HostListener } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

@Directive({
  selector: '[vibrate]'
})
export class ClickVibrateDirective {

  @HostListener('click')
  async onClick() {
    if (Capacitor.isNativePlatform()) {
      await Haptics.impact({style: ImpactStyle.Light});
    }
  }
}
