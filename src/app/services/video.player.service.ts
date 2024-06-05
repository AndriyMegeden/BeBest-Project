import { Injectable } from '@angular/core';
import { ControlAction, MediaAction } from '@interfaces/media.interface';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CurrentVideo {
  id: number;
  videoName: string;
  videoPlayingAction: MediaAction;
  videoControlAction: ControlAction;
}

@Injectable({
  providedIn: 'root'
})
export class VideoPlayerService {
  private currentVideo: BehaviorSubject<CurrentVideo> = new BehaviorSubject<CurrentVideo>(null);
  
  constructor() {
  }

  setPlayer(data: CurrentVideo){
    this.currentVideo.next(data);
  }

  playVideoSubject(data: CurrentVideo){
    this.currentVideo.next(data);
  }

  pauseVideoSubject(data: CurrentVideo): void {
    this.currentVideo.next(data);
  }

  stopAudioSubject(data: CurrentVideo): void {
    this.currentVideo.next(data);
  }

  next(data: CurrentVideo){
    this.currentVideo.next(data)
  }

  prev(data: CurrentVideo){
    this.currentVideo.next(data)
  }

  getCurrentVideoObservable(): Observable<CurrentVideo> {
    return this.currentVideo.asObservable()
  }

}