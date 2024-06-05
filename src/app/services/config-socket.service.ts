/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-trailing-spaces */
import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import { LocalStorageService } from '@core/auth-service/services/localstorage.service';
import { Notification } from '@interfaces/notification.interface';

@Injectable({
    providedIn: 'root'
})
export class ConfigSocketService extends SocketService {

    constructor(
        localStorage: LocalStorageService,
    ){
        super(localStorage);
    }

    onGetConfig(callback){
        this.socket.on('getConfig', (res: Notification) => {
            callback(res)
        })
    }

};
