import { Injectable } from '@angular/core';
import { ControlAction, MediaAction } from '@interfaces/media.interface';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

export interface CurrentAudio {
  id: number;
  // audioName?: string;
  audioPlayingAction?: MediaAction;
  audioControlAction?: ControlAction
  // duration?: number;
}

export interface CurrentAudioData {
  id: number;
  audioName?: string;
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AudioPlayerService {
  private currentAudio: BehaviorSubject<CurrentAudio> = new BehaviorSubject<CurrentAudio>(null);
  private currentAudioData: BehaviorSubject<CurrentAudio> = new BehaviorSubject<CurrentAudioData>(null);
  private currentAudioPlayingStatus: BehaviorSubject<MediaAction> = new BehaviorSubject<MediaAction>(null);
  private currentTime: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private changeCurrentTime: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private repeatMode: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private mixingMode: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  
  
  constructor() {
  }

  setPlayer(data: CurrentAudio){
    this.currentAudio.next(data);
  }

  setAudioPlayingStatus(status: MediaAction){
    this.currentAudioPlayingStatus.next(status);
  }

  playAudioSubject(data: CurrentAudio){
    this.currentAudio.next(data);
  }

  setAudioDataSubject(data: CurrentAudioData){
    this.currentAudioData.next(data)
  }

  pauseAudioSubject(data: CurrentAudio): void {
    this.currentAudio.next(data);
  }

  stopAudioSubject(data: CurrentAudio): void {
    this.currentAudio.next(data);
  }

  next(data: CurrentAudio){
    this.currentAudio.next(data)
  }

  prev(data: CurrentAudio){
    this.currentAudio.next(data)
  }

  setCurrentTime(currentTime: number){
    this.currentTime.next(currentTime)
  }

  getCurrentTimeObservable(): Observable<number>{
    return this.currentTime.asObservable();
  }

  setChangeCurrentTime(currentTime: number){
    this.changeCurrentTime.next(currentTime)
  }

  getChangeCurrentTimeObservable(): Observable<number>{
    return this.changeCurrentTime.asObservable();
  }

  getCurrentTime(): number{
    return this.currentTime.getValue();
  }

  getCurrentAudioObservable(): Observable<CurrentAudio> {
    return this.currentAudio.asObservable()
  }

  getCurrentAudioDataObservable(): Observable<CurrentAudioData> {
    return this.currentAudioData.asObservable()
  }

  getCurrentAudio(): CurrentAudio{
    return this.currentAudio.getValue()
  }

  getCurrentAudioPlayingStatusObserable(): Observable<MediaAction> {
    return this.currentAudioPlayingStatus.asObservable();
  }


  setRepeatMode(mode: boolean): void {
    this.repeatMode.next(mode);
  }

  setMixingMode(mode: boolean): void {
    this.mixingMode.next(mode);
  }

  getRepeatModeObservable(): Observable<boolean> {
    return this.repeatMode.asObservable();
  }

  getMixixngModeObservable(): Observable<boolean> {
    return this.mixingMode.asObservable();
  }

  toggleRepeatMode(): void {
    const currentMode = this.repeatMode.getValue();
    this.repeatMode.next(!currentMode);
  }

  toggleMixingMode(): void {
    const currentMode = this.mixingMode.getValue();
    this.mixingMode.next(!currentMode);
  }
}