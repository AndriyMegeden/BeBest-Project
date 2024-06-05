/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-trailing-spaces */
import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import { LocalStorageService } from '@core/auth-service/services/localstorage.service';
import { Notification } from '@interfaces/notification.interface';

@Injectable({
    providedIn: 'root'
})
export class NotificationSocketService extends SocketService {

    constructor(
        localStorage: LocalStorageService,
    ){
        super(localStorage);
    }

    onReceiveNotification(callback){
        this.socket.on('receiveNotification', (res: Notification) => {
            callback(res)
        })
    }

    public getAuthToken(){
        return {
            auth: {
                token: `Bearer ${this.localStorage.getToken().token}`,
                fcmToken: this.localStorage.getFcmToken()
            },
        }
    }

};
