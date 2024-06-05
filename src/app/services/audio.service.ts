import { Injectable } from '@angular/core';
import { ControlAction, MediaAction } from '@interfaces/media.interface';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CurrentAudio {
  id: number;
  audioName: string;
  audioFile: string;
  audioAction: MediaAction;
  duration: number;
}

export interface CurrentAudioControl {
  id: number;
  controlAction: ControlAction | MediaAction;
}

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  public audio: HTMLAudioElement = new Audio(); // Ініціалізуємо audio тут

  public formattedDuration: string;
  public duration: number;

  constructor() {}

  async loadAudio(audioUrl: string, audioTitle: string, currentTime: number, callback?: (currentTime: number) => void): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.audio.src = audioUrl;
      this.audio.currentTime = currentTime;
      this.audio.addEventListener('loadedmetadata', () => {
        const durationMinutes = Math.floor(this.audio.duration / 60);
        const durationSeconds = Math.floor(this.audio.duration % 60);
        const formattedDuration = `${durationMinutes}:${durationSeconds}`;
        this.formattedDuration = formattedDuration;
        this.duration = Math.round(this.audio.duration);
        resolve();
      });

      this.audio.addEventListener('timeupdate', () => {
        if (callback) {
          const currentTime = this.audio.currentTime;
          callback(currentTime);
        }
      });

      this.audio.preload = 'none';
      this.audio.load();
    });
  }

  async playAudio() {
    await this.audio.play();
  }

  pauseAudio(): void {
    this.audio.pause();
  }

  stopAudio(): void {
    this.audio.pause();
    this.audio.currentTime = 0;
  }
}
