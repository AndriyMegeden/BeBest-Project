import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  
  constructor(
    private translate: TranslateService,
    private toastController: ToastController,
  ){
    
  }

  async showSuccessToast(message: string | boolean = false){
    const toast = await this.toastController.create({
        message: !message ? this.translate.instant('other.toast.success') : this.translate.instant(message as string),
        duration: 2000, // Duration in milliseconds
        position: 'bottom', // Position: top, middle, bottom
        color: 'dark', // Color: primary, secondary, success, warning, danger, light, medium, dark
        buttons: [
          {
            text: this.translate.instant('other.toast.close'),
            role: 'cancel',
            handler: () => {
              console.log('Close clicked');
            },
          },
        ],
      });
      toast.present()
  }

  async showErrorToast(message: string | boolean = false){
    const toast = await this.toastController.create({
        message: !message ? this.translate.instant('other.toast.error') : this.translate.instant(message as string),
        duration: 2000, // Duration in milliseconds
        position: 'bottom', // Position: top, middle, bottom
        color: 'dark', // Color: primary, secondary, success, warning, danger, light, medium, dark
        buttons: [
          {
            text: this.translate.instant('other.toast.close'),
            role: 'cancel',
            handler: () => {
              console.log('Close clicked');
            },
          },
        ],
      });
      toast.present()
  }

}
