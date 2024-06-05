/* eslint-disable no-trailing-spaces */
import { Injectable } from '@angular/core';
import { LocalStorageService } from '@core/auth-service/services/localstorage.service';
import * as io from 'socket.io-client';

@Injectable({
    providedIn: 'root'
})
export class SocketService {
    public socket: io.Socket | any;
    public authToken: string;
    public refresh: boolean = false;
    public connected: boolean = false;
    constructor(
        protected localStorage: LocalStorageService,
    ){
    }

    public init(url: string, path: string, auth = true, callback?){
        if(auth){
            if(this.localStorage.getToken().token){
                this.socket = io.connect(url, {
                    path: `/${path}/socket.io`,
                    transports: ['websocket'],
                    reconnection: true,
                    // reconnectionDelay: 1500,
                    reconnectionAttempts: 8,
                    autoConnect: false,
                    forceNew: true,
                    ...this.getAuthToken()
                });
                
            }
        }
        else{
            this.socket = io.connect(url, {
                path: `/${path}/socket.io`,
                transports: ['websocket'],
                reconnection: true,
                // reconnectionDelay: 1500,
                reconnectionAttempts: 8,
                autoConnect: false,
                forceNew: true,
            });
        }
        this.openConnection(auth)
        if(callback){
            callback(this.socket)
        }
    }

    openConnection(auth = true){
        if(auth){
            this.socket.auth.token = `Bearer ${this.localStorage.getToken().token}`;
        }
        this.socket.open();
    }

    closeConnection(){
        this.socket.close()
    }

    public getAuthToken(){
        return {
            auth: {
                token: `Bearer ${this.localStorage.getToken().token}`
            },
        }
    }

    public destroy(){
        this.socket.disconnect();
    }
};
