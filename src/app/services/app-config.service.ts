/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-trailing-spaces */
import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import { LocalStorageService } from '@core/auth-service/services/localstorage.service';
import { Notification } from '@interfaces/notification.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppConfigService {

    protected appConfig: BehaviorSubject<{[key:string]: string} | null> = new BehaviorSubject<{[key:string]: string} | null>(null);

    constructor(){}

    public setAppConfig(appConfig): void{
        this.appConfig.next(appConfig);
    }

    public getAppConfigObserable(): Observable<{[key:string]: string} | null> {
        return this.appConfig.asObservable()
    }


};
