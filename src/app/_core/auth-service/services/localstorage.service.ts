import { Injectable } from '@angular/core';
import { AuthInfo } from '@interfaces/user.interface';
import { BehaviorSubject, Observable } from 'rxjs';
type LocalStorageTypes = 'variable' | 'array';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  
  constructor() {}

  public setToken(authToken){
    this.setStorageValue('array', 'authorization', {
      token: authToken
    });
  }

  public setUser(authInfo: AuthInfo){
    this.setStorageValue('array', 'user', authInfo);
  }

  public checkToken(){
    if(this.getToken() !== null && this.getToken().token){
      return true;
    }
    else{
      return false;
    }
  }

  public checkUser(): boolean{
    if(this.getUser() !== null && this.getUser()){
      return true;
    }
    else{
      return false;
    }
  }

  public getUser() {
    return this.getStorageValue('array','user');
  }

  public getToken(){
    return this.getStorageValue('array','authorization');
  }

  public removeToken(){
    return this.removeStorageValue('authorization');
  }

  public removeUser(){
    return this.removeStorageValue('user');
  }

  public setCurrentLanguage(value){
    return this.setStorageValue('variable','language',value);
  }

  public getCurrentLanguage(){
    return this.getStorageValue('variable','language');
  }

  public setNotificationStatus(value){
    return this.setStorageValue('variable','notification',value);
  }

  public getNotificationStatus(){
    return this.getStorageValue('variable','notification');
  }

  public setAppConfig(value){
    return this.setStorageValue('array','appConfig',value);
  }

  public getAppConfig(){
    return this.getStorageValue('array','appConfig');
  }

  public setFcmToken(value){
    return this.setStorageValue('variable','fcmToken', value);
  }

  public getFcmToken(){
    return this.getStorageValue('variable','fcmToken');
  }

  public setFirstInitStatus(value){
    return this.setStorageValue('variable','firstInit',value);
  }

  public getFirstInitStatus(){
    return this.getStorageValue('variable','firstInit');
  }

  protected setStorageValue(type: LocalStorageTypes, key: string, value: any){
    if(type === 'variable'){
      localStorage.setItem(key, value.toString());
    }
    if(type === 'array'){
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  protected getStorageValue(type: LocalStorageTypes,key: string){
    if(type === 'variable'){
      return localStorage.getItem(key);
    }
    if(type === 'array'){
      return JSON.parse(localStorage.getItem(key));
    }
  }

  protected removeStorageValue(key: string){
    localStorage.removeItem(key);
    return true;
  }

}
