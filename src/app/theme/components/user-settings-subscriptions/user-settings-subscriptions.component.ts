import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { GlassfyService } from '@services/glassfy.service';
import { GlassfySku } from "capacitor-plugin-glassfy";

@Component({
  selector: 'app-user-settings-subscriptions',
  templateUrl: './user-settings-subscriptions.component.html',
  styleUrls: ['./user-settings-subscriptions.component.scss'],
})
export class UserSettingsSubscriptionsComponent implements OnInit {

  private loading: HTMLIonLoadingElement;

  public offerings = this.glassfyService.getOfferingsObservable();
  public subscription: { pro: boolean } = null;

  constructor(
    private glassfyService: GlassfyService,
    private loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {
    this.subscription = this.glassfyService.getSubscriptionStatus();
  }

  async purchase(sku: GlassfySku){
    this.loading = await this.loadingCtrl.create({
      cssClass: 'loading'
    });
    
    await this.loading.present();
    await this.glassfyService.purchase(sku, () => {
      this.loading.dismiss()
    });
  }

  async restore(){
    await this.glassfyService.restore()
  }

}
