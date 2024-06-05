import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ToastController, AlertController } from "@ionic/angular";
import { Glassfy, GlassfyOffering, GlassfySku, GlassfyPermission, GlassfyTransaction } from "capacitor-plugin-glassfy";
import { environment } from "@environments/environment";
@Injectable({
  providedIn: "root",
})
export class GlassfyService {

  private subscription = new BehaviorSubject({ pro: false });
  private offerings: BehaviorSubject<GlassfyOffering[]> = new BehaviorSubject([]);

  constructor(
    private toastController: ToastController,
    private alertController: AlertController
  ) {}

  async initGlassfy() {
    try {
      const result = await Glassfy.initialize({
        apiKey: environment.glassfyKey,
        watcherMode: false,
      });
      console.log('init');
      console.log(result);
      const permissions = await Glassfy.permissions();
      console.log('permissions');
      console.log(permissions);
			this.handleExistingPermissions(permissions.all);
      const offerings = await Glassfy.offerings();
      console.log('offerings');
      console.log(offerings);
      this.offerings.next(offerings.all)
      await this.getSku()
    } catch (e) {
      console.log('init error: ', e);
    }
  }

    async getSku ()  {
    try {
      const result = await Glassfy.skuWithId({ identifier: "bebest_monthly_14.99" });
      console.log('getSku');
      console.log(result)
    } catch (e) {
      console.log(e);
    }
  };

  async purchase(sku: GlassfySku, callback) {
    try {
      const transaction = await Glassfy.purchaseSku({ sku });
      if (transaction.receiptValidated) {
        this.handleSuccessfulTransactionResult(transaction, sku);
        callback()
      }
    } catch (e) {
      const alert = await this.alertController.create({
        header: 'Purchase failed',
        message: e,
        buttons: ['OK'],
      });

      callback()
      await alert.present();
    }
  }


  handleExistingPermissions(permissions: GlassfyPermission[]) {
    for (const perm of permissions) {
      if (perm.isValid) {
        if (perm.permissionId === 'MonthlySubscription') {
          const subscription = this.subscription.getValue();
          subscription.pro = true;
          this.subscription.next(subscription);
        } 
      }
    }
  }

  async handleSuccessfulTransactionResult(
    transaction: GlassfyTransaction,
    sku: GlassfySku
  ) {
    if (
      transaction.productId.indexOf('bebest_monthly_14.99') >= 0
    ) {
      const subscription = this.subscription.getValue();
      subscription.pro = true;
      this.subscription.next(subscription);

      
    }

    const toast = await this.toastController.create({
      message: 'Thanks for your purchase!',
      position: 'top',
      duration: 2000,
    });
    toast.present();
  }

  getOfferingsObservable () {
    return this.offerings.asObservable();
  }


  async restore(){
    if( this.getSubscriptionStatus().pro){
      const permissions = await Glassfy.restorePurchases();
      console.log(permissions)
    } else{
      console.log('підписка не була активована')
    }
  }

  getSubscriptionStatus(){
    return this.subscription.getValue()
  }
  

}
