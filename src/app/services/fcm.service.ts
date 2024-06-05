import { Injectable } from "@angular/core";
import { Capacitor } from "@capacitor/core";
import { PushNotificationSchema, PushNotifications, Token } from "@capacitor/push-notifications";
import { LocalStorageService } from "@core/auth-service/services/localstorage.service";

@Injectable({
    providedIn: 'root'
})

export class FcmService{

    constructor(
        private localStorage: LocalStorageService,
    ){}

    public async initPush(){
        if(Capacitor.platform !== 'web'){
            await this.registerPush()
        }
    }

    private async registerPush(){
        console.log('Initializing Firebase push');
        PushNotifications.requestPermissions().then(result => {
            if (result.receive === 'granted') {
                PushNotifications.register().then();
                
            }
        });

        PushNotifications.addListener('registration',
        async (token: Token) => {
            console.log('fcmtoken');
            console.log(token.value);
            this.localStorage.setFcmToken(token.value)
        });

        PushNotifications.addListener('registrationError', (error: any) => {
            console.log('Error on registration: ' + JSON.stringify(error));
        });
      
        PushNotifications.addListener(
            'pushNotificationReceived',
            async (notification: PushNotificationSchema) => {
              console.log('Push received: ' + JSON.stringify(notification));
            },
        );
      
        PushNotifications.addListener(
            'pushNotificationActionPerformed',
            (notification: any) => {
              console.log('Push action performed: ' + JSON.stringify(notification));
            },
        );
    }

}