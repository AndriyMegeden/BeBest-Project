import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})
export class VideoService {
    public video: HTMLVideoElement;
    public formattedDuration: string;;
    public duration: number
  
    constructor() {
      this.video = document.createElement('video');
    }
  
    async loadVideo(videoUrl: string): Promise<void> {
      return new Promise<void>((resolve, reject) => {
        this.video.src = videoUrl;
        this.video.style.width = '100%';
        this.video.style.height = '100%';
        this.video.style.objectFit = 'cover';
        this.video.addEventListener('loadedmetadata', () => {
          const durationMinutes = Math.floor(this.video.duration / 60);
          const durationSeconds = Math.floor(this.video.duration % 60);
          const formattedDuration = `${durationMinutes}:${durationSeconds}`;
          this.formattedDuration = formattedDuration;
          this.duration = Math.round(this.video.duration);;
          
          resolve();
        });
        this.video.load(); // Загрузить видео
      });
    }
  
    playVideo() {
      this.video.play();
    }
  
    pauseVideo(): void {
      this.video.pause();
    }
  
    stopVideo(): void {
      this.video.pause();
      this.video.currentTime = 0;
    }
  }